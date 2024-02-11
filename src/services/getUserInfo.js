const getUserInfo = async () => {
  const url = "https://randomuser.me/api/?page=1&results=1&seed=abc"; 

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default getUserInfo;
