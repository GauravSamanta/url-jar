import axios from "axios";
import { useEffect, useState } from "react";
import {redirect} from "react-router-dom"

export default function LinkList() {
  const [urls, setUrls] = useState([{}]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.post("/api/v1/url/getUrls", {}, {
          headers: {
            "Content-Type": "application/json",
           
          },
        });
    
        console.log('Response data:', response.data); // Log the data received
        console.log('Type of response data:', typeof response.data);
    

        if ((response.data)) {
          setUrls(response.data.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        
        console.error(error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div>
      {urls.length === 0 ? (
        <p>0 urls</p>
      ) : (
        <ul>
          {urls.map((url, index) => (
            <li key={index}>{`${url.full} |  ${url.short}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
