

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `logipark`
--


-- --------------------------------------------------------
--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` VALUES
(1, 'Test', 'Test', 'test@test.com', 'pKS+ww0KSGpUz2NbMTNlX3T0bFh/+qLtyMAx3rIN8x333AB6/CseOm+q5BhzhIGO7TmGD7DXcy+bUAnNnWL79+/DpShBdaMJelaeiyZs9tqdMZ59hxKsL3XbADyjgbwGtk1edl0MNuok6t1mnxDqRcViCaGRvnwVsbD4L0YQzGY=', 'zwddGzmoWLZJlmd3JXg4TSOweiOa2oR2yZUQBhMVI+tXr1m7zPytm/FtRZh4s7+UweiY1YR0lyYqh4s11+1WRExiL3TmbfZPN9GSISXO1GcqQWSxMjHO8dfFaQHm2Z6lBoZ8QNseLJdRCmLW38NhnSQeTMESyTbFpFtf1qubqTw=');

--
-- Contenu de la table `parking`
--

INSERT INTO `parking` (`id`, `id_proprietaire`, `nom`, `adresse`, `shortdescription`, `description`, `photo`, `tarifmensuel`, `horaires_acces`, `b_weekend`, `b_souterrain`, `b_gardiennage`, `b_pmr`, `details`, `lat`, `lng`) VALUES
(1, '', 'Parking Banque Populaire', '4 Bd Eugène Deruelle, 69003 Lyon', '20 places de libre', '20 places libres de 19H00 à 7H00 du lundi au vendredi', '1.jpg', 55.00, '1', '1', '1', '1', '1', '', 45.763047, 4.851794),
(2, '', 'Parking Le Clip', '83 cours de la Liberté, 69003 Lyon', '30 places de libre', '30 places libres toute la semaine et à toute heure. Parking sous vidéo-surveillance.', '2.jpg', 45.00, '0', '1', '1', '0', '1', '', 45.756146, 4.843122);

--
-- Contenu de la table `place`
--

INSERT INTO `place` (`id`, `id_parking`, `nom_place`) VALUES
(1, '1', '42'),
(2, '1', '101'),
(4, '2', '21'),
(5, '2', '69'),
(6, '2', '69bis');

--
-- Contenu de la table `reservation`
--

INSERT INTO `reservation` (`id`, `id_utilisateur`, `id_place`, `b_reglement`, `date_debut`, `date_fin`) VALUES
/*(1, '1', '1', '', '2013-06-25', '2013-07-25'),*/
(2, '1', '6', '', '2013-06-23', '2013-09-23');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
