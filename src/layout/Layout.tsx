import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../global/Spinner";
import ContextMenuProvider from "../providers/ContextMenuProvider";
import Header from "./Header";
import './layout.css';

function Layout() {

    const navigation = useNavigation();

    return (
        <ContextMenuProvider>
        <div className="flex flex-col w-full cross-center " >

            <Header />
            {navigation.state === 'loading' && (
                <div className="fixed h-all-screen bg-black-10 w-full flex main-center bg-opacity-70 cross-center" >

                    <Spinner />

                </div>
            )}
            <Outlet />
        </div>
        </ContextMenuProvider>
    )

}

export default Layout;