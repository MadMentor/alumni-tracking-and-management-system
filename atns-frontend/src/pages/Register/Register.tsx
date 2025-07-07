import React, { useState, FormEvent } from 'react';

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

function Register() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Password do not match");
            setMessageType("error");
            return;
        }

        const { confirmPassword, ...dataToSend } = {
            ...formData,
            role: formData.role.toUpperCase(),
        };
        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Registration failed: ", errorData.message || "Unknown Error");
                return;
            }

            const result = await response.json();
            console.log("User registered successfully: ", result);
        } catch (error: any) {
            console.error("Error while registering: ", error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} required /><br /><br />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br /><br />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br /><br />
                <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required /><br /><br />
                <select name={"role"} value={formData.role} onChange={handleChange} required>
                    <option value={""} disabled hidden>
                        -- Select Role --
                    </option>
                    <option value={"alumni"}>Alumni</option>
                    <option value={"student"}>Student</option>
                </select><br /><br />
                <button type="submit">Sign Up</button>
            </form>
            {message && (
                <div
                    style={{
                        color: messageType === "error" ? "red" : "green",
                        marginBottom: "1rem",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
}

export default Register;
