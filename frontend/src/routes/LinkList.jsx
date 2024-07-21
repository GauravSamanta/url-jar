import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner, Card, Typography } from "@material-tailwind/react";

export default function LinkList() {
  const TABLE_HEAD = ["URL", "Shortened URL", "Clicks"];
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.post(
          "/api/v1/url/getUrls",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response data:", response.data); // Log the data received
        console.log("Type of response data:", typeof response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setUrls(response.data.data);
          setIsLoading(false);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUrls();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner />
      </div>
    );
  } else
    return (
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {urls.map(({ full, short, clicks }, index) => {
              const isLast = index === urls.length - 1;
              const classes = isLast ? "" : "border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {full}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <a>{`url-jar.vercel.app${short}`}</a>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {clicks}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
}
