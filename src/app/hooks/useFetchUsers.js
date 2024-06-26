import { useState, useEffect } from "react";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchUsers = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          if(!response.ok) { 
            throw new Error('Network response not OK!');
          }
          return response.json();
        })
        .then((data) => {
          if(isMounted) {
            setUsers(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          if(isMounted) {
            setError(error);
            setLoading(false);
          }
        });
    };

    fetchUsers();

    return () => {
      isMounted = false;
    }
  }, []);

  return {users, loading, error};
}

export default useFetchUsers;