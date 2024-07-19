import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.post("/api/v1/url/getUrls", {
          headers: { "Content-Type": "application/json" },
        });

        if (response) {
          setUrls(response.data);
          console.log(urls);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUrls();
  }, []);

  return <div>hello</div>;
}
