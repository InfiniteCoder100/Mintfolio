import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-purple-300/30 sm:p-6 sm:px-4 bg-opacity-31">
      <div className="mx-auto max-w-[1080px]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-md text-gray-600 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link href="https://github.com/neel-ds/mintfolio"
              target="_blank" className="hover:text-gray-800">
              mintfolio
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
