import React from "react";

const AuthPage = () => {
    return (
        <div className="flex flex-col items-center mt-2.5">
            <card className="bg-amber-700 auth-container flex flex-col items-center border-1 rounded">
                <h1 className="font-bold text-4xl">SignUp</h1>
                <div className="bg-blue-950 flex flex-col items-center input-container">
                    <input type="text" placeholder="Full Name" className="w-xl h-8 outline-none bg-blend-hard-light"/>
                    <input type="text" placeholder="Email" className=""/>
                    <input type="text" placeholder="Password" className=""/>
                    <button>Submit</button>
                </div>
            </card>
        </div>
    );
};

export default AuthPage;
