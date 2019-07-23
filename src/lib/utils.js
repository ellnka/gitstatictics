import React, { Component } from "react";

export default class Utils {
    static loadingDiv() {
        return (
            <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div
                    className="spinner-border ml-auto"
                    role="status"
                    aria-hidden="true"
                ></div>
            </div>
        );
    }

    static userNotFoundDiv() {
        return (
            <div className="alert alert-danger" role="alert">
                User not found!
            </div>
        );
    }

    static formatDate(strDate) {
        let date = new Date(strDate);
        return date.toLocaleDateString();
    }
}
