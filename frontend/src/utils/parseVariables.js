export const parseVariables = (text) => {
    // regex rule
    const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

    // safety check
    if(!text) return [];

    // find all matches
    const matches = [...text.matchAll(VAR_REGEX)];
    // todo: reomve this comment before pushing
    // [
    //     [
    //         '{{ name }}',
    //         'name',
    //         index: 6,
    //         input: 'Hello, i'm {{ name }}.',
    //         groups: undefined
    //     ]
    // ]

    // extact var names & avoid duplicates
    // todo: optimise later via Set & for..of loop
    const extractedVariables = [];
    matches.forEach(match => {
        // check if valid var name & avoid duplicates
        if(match[1] && !extractedVariables.includes(match[1])){
            extractedVariables.push(match[1]);
        }
    });

    return extractedVariables;
};