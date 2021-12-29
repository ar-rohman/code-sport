const stringFormat = (string) => {
    if (!string) return;
    // Replace underscore to space
    const replaceString = string.replace(/_/g, ' ');
    // Capitalized each first word
    const capitalized = replaceString.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    return capitalized;
};

export default stringFormat;
