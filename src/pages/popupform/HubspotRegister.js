import { useEffect } from "react";

const HubspotRegister = ({
  portalId,
  formId,
  hubspotFormSubmit,
  data
}) => {
  useEffect(() => {
    if (!hubspotFormSubmit) return;

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: portalId,
          formId: formId,
          target: "#hubspotFormRegister",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("hubspotFormRegister");
      if (existing) existing.innerHTML = "";
      document.body.removeChild(script);
    };
  }, [hubspotFormSubmit]);

  return (
    <div className="w-full p-4 mt-4">
      {hubspotFormSubmit && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Almost done! Just submit this final form:
          </h3>
          <div id="hubspotFormRegister" />
        </div>
      )}
    </div>
  );
};

export default HubspotRegister;
