function isValidEmail(email) {
    const match = email.match(/\w+@gmail.com/);
    if (match && match[0] === match.input) return true;
}

function isValidUsername(name) {
    const match = name.match(/[a-z][A-Za-z0-9]+/);
    if (match && match[0] === match.input) return true;
}

module.exports = {
    isValidEmail,
    isValidUsername,
};
