import React from "react";
import Stats from "./stats";

export default class StatsRepos extends Stats {
    constructor(props) {
        super(props);
    }

    _generateStats(repos) {
        if (!repos) return;
        super._generateStats();
        let reposArr = Object.values(repos);
        let arr = [];
        arr.push({
            name: "Languages",
            value: this._getLanguages(reposArr).join(", ")
        });
        return arr;
    }

    _getLanguages(repos) {
        let languages = [];
        if (repos && repos.length > 0) {
            languages = repos
                .map(item => item.language)
                .filter((item, pos, array) => array.indexOf(item) === pos && item);
        }
        return languages;
    }
}
