export default async function getUserNameById(id) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const { username } = await response.json();
        return username;
    } catch (e) {
        window.location.href = './error.html';
    }
}
