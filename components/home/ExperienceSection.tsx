import ExperienceCompany from "../display/ExperienceCompany";
import { useBoolean } from "react-use";
import { Button } from "../form/Button";

export function ExperienceSection() {
  const [showAll, toggle] = useBoolean(false);

  return (
    <div className={"mx-auto max-w-screen-lg"}>
      <h2 className={"mb-20 mt-60 text-center text-4xl font-thin"}>
        Work Experience
      </h2>
      <div className={"flex w-full flex-col"}>
        <h3 className={"mb-10 text-xl font-medium"}>Currently at...</h3>
        <ExperienceCompany
          cover={"/rfsmart.png"}
          company={"RF-SMART"}
          position={"Senior React Specialist"}
          period={"July 2022 - Now"}
          paragraph={`Came back to continue what I started with the shipping application 🚀🚀🚀🚀`}
          className={
            "hover:outline-2xl shadow-sm hover:shadow-2xl hover:shadow-red-50 hover:outline-red-100"
          }
        />
      </div>
      <h3 className={"mb-10 mt-20 text-xl font-medium"}>Previous Experience</h3>
      <div className={"flex w-full flex-col gap-20"}>
        <ExperienceCompany
          cover={"/coinbase-cover.jpg"}
          company={"Coinbase"}
          position={"Software Engineer"}
          period={"February – July 2022"}
          paragraph={`Developed Coinbase's new NFT Marketplace experience. I was in the Social team, in charge of the more... well,
                   social aspects of the platform. I was the FE developer leading the entire comments and profile pages of the app. 
                   Unfortunately, I was part of the first wave of 2022 layoffs.`}
          className={
            "hover:outline-2xl shadow-sm hover:shadow-2xl hover:shadow-blue-50 hover:outline-blue-100"
          }
        />
        {showAll ? (
          <>
            <ExperienceCompany
              company={"RF-SMART"}
              position={"React Developer II"}
              period={"2021 – 2022"}
              paragraph={`
            Designed and developed a brand new React application for the warehouse and shipping industry. The application was used by warehouse workers and guided them through the process of shipping items to customers.
            `}
            />
            <ExperienceCompany
              company={"Transcor Data Services"}
              position={"Front-End Designer & Developer"}
              period={"2019 – 2021"}
              paragraph={`
          Designed and developed front-end experiences for applications ranging from Kiosks, Mobile Applications, E-Ticketing Platforms, and Admin applications, also assisted with more DevOps-related tasks like testing and integrating SDKs for new hardware, debugging build issues, investigating new development tools, and set up new projects from scratch.
          `}
            />
            <ExperienceCompany
              company={"Gleanview"}
              position={"Front-End Designer & Developer"}
              period={"2016 – 2019"}
              paragraph={`
          Designed and developed screens and interaction for new features in the CRM app, designed and developed marketing website and landing pages, designed several branding guidelines for child apps.
          `}
            />
            <ExperienceCompany
              company={"Jacksonville Business Journal"}
              position={"Graphic Designer"}
              period={"2015 – 2016"}
              paragraph={`Designed digital ads, designed and developed landing pages for clients.`}
            />
          </>
        ) : (
          <div className={"mx-auto"}>
            <Button
              size={"lg"}
              variant={"outline"}
              onClick={() => toggle(true)}
            >
              Show All Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
