async function postData(url, data, auth) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
            "Authorization":auth
        },
        body: JSON.stringify(data),
      });
      const resultat = await response.json();
      return resultat;
    } catch (error) {
      return error;
    }
  }
  export {postData}