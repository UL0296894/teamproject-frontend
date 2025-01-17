import { Facebook, Twitter, Instagram, Github } from "lucide-react"; // Se hai icone
import { Button } from "@/components/ui/button"; // Se hai un componente Button personalizzato
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Sezione Info */}
          <div>
            <h3 className="text-3xl font-extrabold text-gray-100 mb-4">
              MovieReviews
            </h3>
            <p className="text-lg text-gray-300">
              Your go-to place for movie reviews. Discover, rate, and share your
              favorite movies with the world! Let us help you find your next
              watch.
            </p>
          </div>

          {/* Sezione Links */}
          <div>
            <h4 className="text-xl font-semibold text-gray-100 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white font-medium transition-all duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white font-medium transition-all duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/movies"
                  className="text-gray-300 hover:text-white font-medium transition-all duration-300"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white font-medium transition-all duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Sezione Social */}
          <div>
            <h4 className="text-xl font-semibold text-gray-100 mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-400">
          <p className="text-lg">
            © 2024 <span className="font-bold">MovieReviews</span>. All rights
            reserved.
          </p>
          <p>
            <a
              href="/terms"
              className="text-gray-300 hover:text-white font-medium transition-all duration-300"
            >
              Terms of Service
            </a>{" "}
            |{" "}
            <a
              href="/privacy"
              className="text-gray-300 hover:text-white font-medium transition-all duration-300"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
