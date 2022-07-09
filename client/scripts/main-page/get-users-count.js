export default async function getUsersCount() {
    try {
        const countHeading = document.querySelector('h1#count-heading');

        const response = await fetch('http://localhost:3000/users');
        const { count } = await response.json();

        countHeading.textContent = `${count} users currently registered!`;
    } catch (e) {
        alert('Technical error! Probably server is down...');
        //Може би не е необходимо, когато имаме /test call-а в index.
    }
}
