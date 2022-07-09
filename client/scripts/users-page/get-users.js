export default async function getUsers() {
    try {
        const data = await fetch('http://localhost:3000/users').then(response =>
            response.json()
        );

        return data;
    } catch (e) {
        alert(e);
    }
}
