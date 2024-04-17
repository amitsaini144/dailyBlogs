import Menu from "./Menu"
import { Link, useLocation } from "react-router-dom"

const hiddenPaths = ['/publish'];

export const Appbar = () => {
    const location = useLocation();
    const isButtonHidden = hiddenPaths.includes(location.pathname);

    return <div className="fixed top-0 left-0 right-0 z-50 border-b flex justify-between px-10 py-4 mb-10 backdrop-blur-lg">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-white text-xl">
            Daily Blogs
        </Link>
        <div>
            {!isButtonHidden &&
                <Link to={`/publish`}>
                    <button type="button" className="text-black hover:text-white border border-white bg-white hover:bg-black font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
                </Link>
            }
            <Menu />
        </div>
    </div>
}
