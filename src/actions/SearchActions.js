import {
    SEARCH_CHANGED,
    SEARCH_RESULTS
} from './types'

export const searchChanged = (text) => {
    return {
        type: SEARCH_CHANGED,
        payload: text
    };
};

export const doSerach = (episodes, textToSearch) => {

    return (dispatch) => {

        var matches = [];
        const normalizedTextToSearch = textToSearch.toLowerCase()

        console.log("Episodes", Object.keys(episodes).slice(0, 10))

        Object.keys(episodes).slice(0, 10).map((x) => {

            console.log("Episode", episodes[x])
            console.log("Tags", episodes[x].tags)

            if (episodes[x].tags !== undefined) {
                Object.keys(episodes[x].tags).map((key) => {

                    var labelTitle = episodes[x].tags[key].title

                    if (levenshtein(labelTitle, normalizedTextToSearch) <= 1)
                        matches.push(episodes[x])
                    else {
                        const labelItems = labelTitle.split(" ");
                        const textItems = normalizedTextToSearch.split(" ")

                        console.log("Label items", labelItems)
                        console.log("Text items", textItems)

                        for (var i = 0; i < textItems.length; i++) {
                            for (var j = 0; j < labelItems.length; j++) {
                                if (levenshtein(labelItems[j], textItems[i]) <= 1) {
                                    if (!matches.includes(episodes[x]))
                                        matches.push(episodes[x])
                                    break;
                                }
                            }
                            if (j != labelItems.length - 1)
                                break;
                        }
                    }
                });
                // console.log('Actions...', Object.keys(episodes).slice(0, 10))
                // console.log(`Search: ${textToSearch.toLowerCase()}, Label: ${episodes[x].tags}, Levebshtein: ${levenshtein(episodes[x].tags, textToSearch.toLowerCase())}`)
            }
        })

        console.log(matches)

        dispatch({ type: SEARCH_RESULTS, payload: matches });
    };

}

var levenshtein = function (a, b) {
    if (a == undefined || a.length == 0) return b.length;
    if (b == undefined || b.length == 0) return a.length;

    // swap to save some memory O(min(a,b)) instead of O(a)
    if (a.length > b.length) {
        var tmp = a;
        a = b;
        b = tmp;
    }

    var row = [];
    // init the row
    for (var i = 0; i <= a.length; i++) {
        row[i] = i;
    }

    // fill in the rest
    for (var i = 1; i <= b.length; i++) {
        var prev = i;
        for (var j = 1; j <= a.length; j++) {
            var val;
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                val = row[j - 1]; // match
            } else {
                val = Math.min(row[j - 1] + 1, // substitution
                    prev + 1,     // insertion
                    row[j] + 1);  // deletion
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }

    return row[a.length];
}

