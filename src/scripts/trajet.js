const API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFjZTZhMDY2YmFkNjQ0MmU5MDdlZTVhOWI0MzVkMzE4IiwiaCI6Im11cm11cjY0In0='; // Remplace par ta clé OpenRouteService

let map, routeLayer;

// ----------- FONCTION GLOBALE POUR LA DURÉE -----------
async function getTrajetDuration(depart, arrivee, callback) {
    const geo = async (adresse) => {
        try {
            const resp = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(adresse)}`);
            const data = await resp.json();
            return data.features?.[0]?.geometry.coordinates ?? null;
        } catch (e) {
            return null;
        }
    };

    try {
        const coordDepart = await geo(depart);
        const coordDest = await geo(arrivee);

        if (!coordDepart || !coordDest) {
            callback("Adresse non trouvée");
            return;
        }

        const resp = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
            method: 'POST',
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coordinates: [coordDepart, coordDest]
            })
        });
        const trajet = await resp.json();
        const dureeSec = trajet.features[0].properties.summary.duration;
        const h = Math.floor(dureeSec / 3600);
        const m = Math.round((dureeSec % 3600) / 60);
        let dureeTxt = '';
        if (h > 0 && m > 0) dureeTxt = `${h}h${m}min`;
        else if (h > 0) dureeTxt = `${h}h`;
        else if (m > 0) dureeTxt = `${m}min`;
        else dureeTxt = "0min";
        callback(dureeTxt);
    } catch (e) {
        callback("Erreur API");
    }
}
// ----------- RECHERCHE ACCUEIL -----------
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('button');
    if (btn) {
        btn.addEventListener('click', async function() {
            const depart = document.querySelector('input[placeholder="Départ"]').value;
            const destination = document.querySelector('input[placeholder="Destination"]').value;
            const resultDiv = document.getElementById('result-trajet');
            resultDiv.innerHTML = "Calcul en cours...";

            getTrajetDuration(depart, destination, function(duree) {
                resultDiv.innerHTML = `<div style="background:#e3f3d2;padding:18px 0 10px 0;border-radius:10px;margin-bottom:10px;">
                    <b>Trajet :</b> ${depart} → ${destination}<br>
                    <b>Durée estimée :</b> ${duree}
                </div>`;
            });
        });
    }

    // ----------- POUR CHAQUE CARTE COVOITURAGE -----------
    document.querySelectorAll('.ride-info').forEach(function(card) {
        const depart = card.getAttribute('data-depart');
        const arrivee = card.getAttribute('data-arrivee');
        const dureeSpan = card.querySelector('.duree-api');
        if (depart && arrivee && dureeSpan) {
            getTrajetDuration(depart, arrivee, function(duree) {
                dureeSpan.textContent = duree;
            });
        }
    });
});