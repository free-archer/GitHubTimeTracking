import { useState } from "react";
import KeySet from "../components/KeySet";

const Settings:React.FC  = () => {

    return (
        <>
            <div className="block">
                <div className="field is-grouped">
                    <KeySet />
                </div>
            </div>
            <div className="block">
            This text is within a <strong>second block</strong>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
            </div>
            <div className="block">
            This text is within a <strong>third block</strong>. This block has no margin at the bottom.
            </div>
        </>
    )
}

export default Settings;