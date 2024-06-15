import MainCol from "../../components/MainCol";
import SendGifSection from "../../components/home/SendGifSection";

const Page = () => {
  return (
    <MainCol>
      <h1 className={"mt-5"}>Hack Report Privacy & Contact</h1>
      <div className={"mb-5 flex flex-col gap-2"}>
        <p>
          This privacy policy will explain how my app, Hack Report, uses the
          personal data (none) we collect from you when you use our website.
        </p>
        <p>
          We don't collect any personal data from you. We don't use cookies or
          any other tracking technology. We don't store any data on our servers.
          We don't have any servers.
        </p>
        <p>
          We don't share your data with any third party. We don't have any data
          to share.
        </p>
        <p>We don't delete any data. We don't have any data to delete.</p>
        <p>We don't have any data.</p>
        <p>
          You can contact me by sending me a gif below. Make sure to include
          your email address in the message if you want me to respond.
        </p>
      </div>
      <SendGifSection />
    </MainCol>
  );
};

export default Page;
