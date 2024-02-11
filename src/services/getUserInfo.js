const getUserInfo = async () => {
 
  const url = `https://randomuser.me/api/?page=1&results=10&seed=abc`; 

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    const randomResult = Math.floor(Math.random() * 10);
    const userData =data.results[randomResult]
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default getUserInfo;
