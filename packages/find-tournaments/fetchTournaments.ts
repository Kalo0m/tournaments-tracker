import { JSDOM } from 'jsdom';

export async function fetchTournaments() {
  const tenupPage = await fetch('https://tenup.fft.fr/recherche/tournois')
    .then((res) => res.text())
    .then((text) => {
      return new JSDOM(text);
    });
  const id = (
    tenupPage.window.document.querySelector(
      '#recherche-tournois-form > div > input[type=hidden]:nth-child(7)'
    ) as HTMLInputElement
  ).value;

  return await fetch('https://tenup.fft.fr/system/ajax', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'sec-ch-ua':
        '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
      Referer: 'https://tenup.fft.fr/recherche/tournois',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: `"recherche_type=ville&ville%5Bautocomplete%5D%5Bcountry%5D=fr&ville%5Bautocomplete%5D%5Btextfield%5D=&ville%5Bautocomplete%5D%5Bvalue_container%5D%5Bvalue_field%5D=Nantes%2C+44000&ville%5Bautocomplete%5D%5Bvalue_container%5D%5Blabel_field%5D=%3Cdiv+class%3D%22reference-autocomplete%22%3ENantes%2C+44%2C+Loire-Atlantique%2C+Pays+de+la+Loire%3C%2Fdiv%3E&ville%5Bautocomplete%5D%5Bvalue_container%5D%5Blat_field%5D=&ville%5Bautocomplete%5D%5Bvalue_container%5D%5Blng_field%5D=&ville%5Bdistance%5D%5Bvalue_field%5D=30&club%5Bautocomplete%5D%5Btextfield%5D=&club%5Bautocomplete%5D%5Bvalue_container%5D%5Bvalue_field%5D=&club%5Bautocomplete%5D%5Bvalue_container%5D%5Blabel_field%5D=&pratique=TENNIS&date%5Bstart%5D=09%2F03%2F23&date%5Bend%5D=18%2F10%2F23&epreuve%5BSM%5D=SM&categorie_age%5B200%5D=200&type%5BT%5D=T&tournois_interne=0&inscription_ligne=0&paiement_ligne=0&page=0&sort=_DIST_&form_build_id=${id}&form_id=recherche_tournois_form&_triggering_element_name=submit_main&_triggering_element_value=Rechercher`,
    method: 'POST',
  }).then((res) => res.json());
}
