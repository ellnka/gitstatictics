import React from "react";
import Stats from "./stats";

export default class StatsUser extends Stats {
    constructor(props) {
        super(props);
    }

    _generateStats(info) {
        if (!info) return;

        return [
            { name: "Public Repos", value: info.public_repos },
            { name: "Public Gists", value: info.public_gists },
            { name: "Followers", value: info.followers },
            { name: "Following", value: info.following }
        ];
    }
}
