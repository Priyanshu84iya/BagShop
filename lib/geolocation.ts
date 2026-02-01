export interface AddressComponents {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function detectLocation(): Promise<AddressComponents | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use OpenStreetMap Nominatim for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'PryventoEcommerce/1.0'
              }
            }
          );
          
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            
            // Extract address components
            const address = [
              addr.house_number,
              addr.road || addr.street,
              addr.neighbourhood || addr.suburb
            ].filter(Boolean).join(", ");
            
            const city = addr.city || addr.town || addr.village || addr.county || "";
            const state = addr.state || addr.region || "";
            const postalCode = addr.postcode || "";
            const country = addr.country || "";
            
            resolve({
              address: address || addr.display_name?.split(',')[0] || "",
              city,
              state,
              postalCode,
              country
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          resolve(null);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access denied. Please enable location permissions.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out.");
            break;
        }
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
