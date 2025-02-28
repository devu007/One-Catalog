const fetchClipdropKey = async (): Promise<string> => {
    try {
      const response = await fetch("one-catalog-server.onrender.com/user/clipdrop-key");
      const data = await response.json();
      if (response.ok) {
        console.log(data.apiKey);
        
        return data.apiKey;
      } else {
        throw new Error('Failed to fetch API key');
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
      throw error;
    }
  };
  
  export default fetchClipdropKey;
  