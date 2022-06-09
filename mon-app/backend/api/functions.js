//Fonction pour convertir une promesse en callback pour qu'elle soit intelligible pour Express. (Merci à Brewal)
function asyncMiddleware(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

//Fonction pour convertir un angle en degré vers un angle en radians.
const deg2rad = deg => (deg * Math.PI) / 180.0;

//Calcul de la distance entre 2 points GPS.
function calculDistance2PointsGPS(lat1, long1, lat2, long2) {
    return 6378137 * Math.acos(Math.sin(deg2rad(lat2)) * Math.sin(deg2rad(lat1)) + Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(long2) - deg2rad(long1)));
}

//Retourne la distance d'un trajet grâce a la fonction de calcul.
function calculDistanceTrajet(parcours) {
    let ret = 0.0;
    for (let i = 1; i < parcours.length; i++) {
        ret += calculDistance2PointsGPS(parcours[i - 1].latitude, parcours[i - 1].longitude, parcours[i].latitude, parcours[i].longitude);
    }
    return ret.toFixed(1);
}

//Permet de remplacer les symboles pour empecher les failles de type XSS (Source: https://stackoverflow.com/a/30970751)
function escape(string) {
    const lookup = {
        '&': "&amp;",
        '"': "&quot;",
        '\'': "&apos;",
        '<': "&lt;",
        '>': "&gt;"
    };
    return string.replace(/[&"'<>]/g, c => lookup[c]);
}

module.exports = {asyncMiddleware: asyncMiddleware, calculDistanceTrajet: calculDistanceTrajet, htmlescape: escape}