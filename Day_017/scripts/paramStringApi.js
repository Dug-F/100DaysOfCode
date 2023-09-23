// composes a string of the format ?latitude=25.2&longitude=55.27&current_weather=true
// from the parameters passed
function composeParameters(params) {
  let paramString = "";
  for (const key in params) {
    const separator = paramString.length === 0 ? "?" : "&";
    paramString += separator + key + "=" + params[key];
  }

  return paramString;
}

async function retrieveDataFromApi(url, params) {
  try {
    const response = await fetch(`${url}${params}`);

    if (!response.ok) {
      console.error(`Error received: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// fetch the location data
async function fetchFromApi(url, parmsObj, printParams=false) {
  try {
    // compose parameters
    const parms = composeParameters(parmsObj);
    
    // print parameters if requested by function call
    if (printParams) console.log(parms);

    // get data from api
    const data = await retrieveDataFromApi(url, parms);
    return await data;
  } catch (error) {
    console.error(`Failed to data from api: ${url}${parms}`, error.message);
  }
}
