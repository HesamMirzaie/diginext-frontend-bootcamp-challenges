async function mocking(mockingTime) {
  setTimeout(async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, mockingTime);
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => mocking(1000));
