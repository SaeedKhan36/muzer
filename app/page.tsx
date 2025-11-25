import Image from "next/image";
console.log("process.env.GOOGLE_CLIENT_ID")
console.log("process.env.GOOGLE_CLIENT_SECRET")
import App from "./component/app";

export default function Home() {
  return (
    <div>
      <main>
        <App />
      </main>
    </div>
  );
}
