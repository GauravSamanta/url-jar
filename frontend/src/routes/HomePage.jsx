import React from "react";
import CreateLink from "./CreateLink";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex justify-center mt-[8rem]">
      <CreateLink />

      <Link to="/short" className="flex">
        <Button>
          show <br />
          shortened <br />
          links
        </Button>
      </Link>
    </div>
  );
}
