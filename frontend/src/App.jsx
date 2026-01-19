import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        const interval = setInterval(() => {
            document.body.style.top = "0px";
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return (
        <main>
            <Header />
            <Outlet />
            <Footer />
            <Toaster />
        </main>
    );
}

export default App;