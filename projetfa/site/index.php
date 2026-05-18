<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Fa - L'Émotion de la Découverte</title>
	<!-- Styles existants du projet -->
	<link rel="stylesheet" href="style/style.css">
	<!-- Polices et icônes externes -->
	<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>

	<header class="hero-banner">
		<div class="carousel-images">
			<img src="images/image1.webp" alt="Vue du site archéologique 1" class="carousel-image active">
			<img src="images/image2.webp" alt="Vue du site archéologique 2" class="carousel-image">
			<img src="images/image3.webp" alt="Vue du site archéologique 3" class="carousel-image">
			<img src="images/image4.webp" alt="Vue du site archéologique 4" class="carousel-image">
			
			<div class="contact-col">
		<div class="overlay"></div>

		<div class="navbar-container">
			<div class="container">
				<nav class="navbar">
					<div class="logo">
						<img src="images/logo.webp" alt="Logo Fa - site archéologique" width="40">
					</div>
					<ul class="nav-links">
						<li><a href="index.php">Accueil</a></li>
						
					</ul>
					<a href="/vues/reservation.php" class="btn btn-orange btn-small">Réserver</a>
				</nav>
			</div>
		</div>

		<div class="container hero-content">
			<p class="slogan-small">VENEZ VIVRE</p>
			<h1>L'ÉMOTION DE LA DÉCOUVERTE !</h1>
			<p>TOUT UN PROGRAMME À DÉCOUVRIR AU FA</p>
			<a href="vues/programme.html" class="btn btn-orange btn-large">CONSULTER LE PROGRAMME</a>
		</div>

		<div class="social-links">
			<a href="https://www.facebook.com/sitedufa/"><i class="fab fa-facebook-f"></i></a>
			<a href="https://www.instagram.com/sitedufa/"><i class="fab fa-instagram"></i></a>
		</div>
	</header>

	<!-- Sections statiques de la page d'accueil -->
	<section class="section news-event">
		<div class="container event-grid">
			<div class="image-col">
				<img src="images/event_image.jpg" alt="Vue du site archéologique Fa">
			</div>
			<div class="content-col">
				<p class="tag-label">À LA UNE</p>
				<h2>QUE FAIRE EN NOVEMBRE ?</h2>
				<p class="date"><i class="far fa-calendar-alt"></i> Du 2 au 30 Nov.</p>
				<p>Découvrez les visites guidées, ateliers pour enfants et conférences prévues ce mois-ci.</p>
				<a href="vues/ALaUne.html" class="link-more">En savoir plus <i class="fas fa-chevron-right"></i></a>
			</div>
		</div>
	</section>

	<section class="section coming-soon" style="background-color: #f5f5f5;">
		<div class="container">
			<h2>PROCHAINEMENT AU FA</h2>
			<div class="card-coming-soon">
				<img src="images/fouille.webp" alt="Chantier de fouilles archéologiques">
				<div class="card-content">
					<p class="tag-label orange-bg">EXPOSITION</p>
					<h3>DÉCOUVREZ MERUEILLE</h3>
					<p class="date-small"><i class="far fa-calendar-alt"></i> Mars 2026</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section visit-prep">
		<div class="container">
			<h2>PRÉPAREZ VOTRE VISITE</h2>
			<div class="cards-grid">
				<div class="card-visit public">
					<i class="fas fa-users icon-large"></i>
					<h3>Tout public</h3>
					<a href="#" class="btn btn-visit">Visiter</a>
				</div>
				<div class="card-visit family">
					<span class="promo-tag">JEUX GRATUITS</span>
					<i class="fas fa-child icon-large"></i>
					<h3>En famille</h3>
					<a href="#" class="btn btn-visit">Visiter</a>
				</div>
				<div class="card-visit groups">
					<i class="fas fa-building icon-large"></i>
					<h3>Groupes adultes</h3>
					<a href="#" class="btn btn-visit">Visiter</a>
				</div>
				<div class="card-visit schools">
					<span class="promo-tag">OFFRE ÉTÉ</span>
					<i class="fas fa-school icon-large"></i>
					<h3>Groupes scolaires</h3>
					<a href="#" class="btn btn-visit">Visiter</a>
				</div>
			</div>

			<div class="titus-section">
				<img src="images/titus_character.jpg" alt="Personnage Titus" class="titus-image">
				<div class="titus-content">
					<p class="tag-label orange-bg">ZONE ENFANTS</p>
					<h2>JOUEZ AVEC TITUS !</h2>
					<p>Découvrez les activités ludiques pour les jeunes archéologues.</p>
					<a href="#" class="btn btn-orange btn-small">Je joue</a>
				</div>
			</div>
		</div>
	</section>

	<section class="section hours-prices" style="background-color: #f5f5f5;">
		<div class="container hours-prices-grid">
			<div class="hours-col">
				<h3>HORAIRES</h3>
				<p>Du 1 avril au 30 septembre : 9h30 - 18h30</p>
				<p>Du 1 octobre au 31 mars : 10h00 - 17h00</p>
				<a href="#" class="link-more">Voir les détails <i class="fas fa-chevron-right"></i></a>
			</div>
			<div class="prices-col">
				<h3>TARIFS</h3>
				<p>Plein tarif : 8€</p>
				<p>Tarif réduit : 6€</p>
				<p>Gratuit pour les moins de 18 ans.</p>
				<a href="/vues/reservation.php" class="link-more">Reserver <i class="fas fa-chevron-right"></i></a>
			</div>
		</div>
	</section>

	<section class="section map-contact">
		<div class="container map-contact-grid">
			<div class="map-col">
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.742545305052!2d-0.8789225999999999!3d45.5353862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4801a1714d89da75%3A0xfb777ad670760418!2s25%20Rte%20du%20FA%2025%2C%2017120%20Barzan!5e0!3m2!1sfr!2sfr!4v1762437707635!5m2!1sfr!2sfr" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>
            
			<div class="contact-col">
				<div class="footer-logo">
					<img src="images/logo.webp" alt="Logo Fa " width="100">
				</div>
				<p>FA - Site Archéologique</p>
				<p>BP 12345 - 17000 La Rochelle Cedex 1</p>
				<p>Téléphone : 05 46 90 43 66</p>
				<div class="social-links-footer">
					<a href="https://www.facebook.com/sitedufa/"><i class="fab fa-facebook-f"></i></a>
					<a href="https://www.instagram.com/sitedufa/"><i class="fab fa-instagram"></i></a>
				</div>
			</div>
			<footer class="main-footer">
		<div class="container">
			<p style="margin:0;">&copy; 2026 Musée et Site Archéologique de l'Océanède. <a href="vues/RGPD.html">Mentions légales & RGPD</a></p>
		</div>
	</footer>
		</div>
	</section>

	<!-- Zone dynamique : si un contrôleur est demandé, on inclut son contrôleur PHP -->
	<div id="contenu" class="container">
		<?php
		// si aucune information n'est présente dans l'url, le controleur par défaut sera 'general'
		if (isset($_GET['controleur']))
			$controleur = filter_var($_GET['controleur'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		else
			$controleur = 'general';

		// Par défaut on affiche la page d'accueil statique ci-dessus.
		// Si un autre controleur est demandé, on l'inclut ici pour conserver le comportement existant.
		if ($controleur !== 'general') {
			switch ($controleur) {
				case 'developpeurs':
					include_once 'controleurs/gestionDeveloppeurs.php';
					break;
				case 'competences':
					include_once 'controleurs/gestionCompetences.php';
					break;
			}
		}
		?>
	</div>

	<script>

	
		const images = document.querySelectorAll('.carousel-image');
		let currentImage = 0;

		function nextImage() {
			images[currentImage].classList.remove('active');
			currentImage = (currentImage + 1) % images.length;
			images[currentImage].classList.add('active');
		}

		setInterval(nextImage, 5000); 
	</script>

</body>
</html>
