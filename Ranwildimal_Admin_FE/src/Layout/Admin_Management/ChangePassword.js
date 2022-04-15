import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import "./profile.css";


function ChangePassword(props) {
    const { title, children, openPopup, setOpepPopup } = props;
    return (
        <>
            <div className="reset_form">
                <Dialog open={openPopup} width="lg">
                    <DialogTitle>
                        <div style={{ display: 'flex', justifyContent: 'center' }}><label>Change Password</label></div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="password_field">
                            <label></label>
                            <input
                                type="text"
                                className="input-password"
                                id="txt_old_password"
                                placeholder="Old password"
                                maxLength="255"
                                required
                            />
                            <label></label>
                            <input
                                type="text"
                                className="input-password"
                                id="txt_new_password"
                                placeholder="New password"
                                maxLength="255"
                                required
                            />
                            <label></label>
                            <input
                                type="text"
                                className="input-password"
                                id="txt_reenter_password"
                                placeholder="Re-enter password"
                                maxLength="255"
                                required
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <button
                                type="submit"
                                name="ex_button"
                                id="btn_submit_changepass"
                                className="password_register"
                            >
                                Submit
                            </button>
                            <button className="password_register" type="submit" onClick={() => setOpepPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

        </>

    )
}

export default ChangePassword;