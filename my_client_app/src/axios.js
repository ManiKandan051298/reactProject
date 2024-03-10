
async function fetchData1(appendurl) {
  const url = 'http://localhost:8000' + appendurl;
  console.log("funcitonc alled")
  try {
    const response = await fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Handle the response data
    console.log('Response:', data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
}

export default fetchData1;
