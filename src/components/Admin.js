import React, {useEffect} from 'react'
import {Sidebar} from './index'

function Admin() {

    /**
     * Setting the page's title
     */
    useEffect(() => {
        document.title = 'Admin';
    }, []);

    return (
        <div className="homepage">
            <Sidebar>
                <section>
                    <h1>Admin</h1>
                </section>
            </Sidebar>
        </div>
    )
}

export default Admin