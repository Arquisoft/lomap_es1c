// Import from "@inrupt/solid-client-authn-browser"
import {
    login,
    handleIncomingRedirect,
    getDefaultSession,
    fetch
  } from "@inrupt/solid-client-authn-browser";
  
  // Import from "@inrupt/solid-client"
  import {
    addUrl,
    addStringNoLocale,
    createSolidDataset,
    createThing,
    getPodUrlAll,
    getSolidDataset,
    getThingAll,
    getStringNoLocale,
    removeThing,
    saveSolidDatasetAt,
    setThing
  } from "@inrupt/solid-client";
  
  import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";



  function loginToSelectedIdP() {
    const SELECTED_IDP =   "https://login.inrupt.com";
  
    return login({
      oidcIssuer: SELECTED_IDP,
      redirectUrl: window.location.href,
      clientName: "Getting started app"
    });
  }

  async function handleRedirectAfterLogin() {
    await handleIncomingRedirect();
  
    const session = getDefaultSession();
    if (session.info.isLoggedIn) {
      // Update the page with the status.
      console.log(session.info.webId);
    }
  }
  handleRedirectAfterLogin();
  
  btnMain.onclick = function () {
    loginToSelectedIdP();
  };