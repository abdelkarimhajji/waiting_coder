-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 13 juin 2024 à 00:39
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `waiting_coder`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `email`, `password`, `image`) VALUES
(1, 'Bouchra', 'bakkali', 'bakkali@gmail.com', 'Bakkali', 'woman.png');

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id` int(255) NOT NULL,
  `name_class` varchar(255) NOT NULL,
  `number_class` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id`, `name_class`, `number_class`) VALUES
(1, 'berline', 1),
(2, 'tokyo', 2),
(3, 'new', 3);

-- --------------------------------------------------------

--
-- Structure de la table `competitions`
--

CREATE TABLE `competitions` (
  `id` int(255) NOT NULL,
  `title_competition` varchar(255) NOT NULL,
  `description_competition` varchar(2000) NOT NULL,
  `month_competition` varchar(255) NOT NULL,
  `day_competition` varchar(255) NOT NULL,
  `time_competition` varchar(255) NOT NULL,
  `finished` int(255) NOT NULL,
  `date_announcement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `competitions`
--

INSERT INTO `competitions` (`id`, `title_competition`, `description_competition`, `month_competition`, `day_competition`, `time_competition`, `finished`, `date_announcement`) VALUES
(2, 'App Architects', 'The App Architects competition is like a coding showdown where developers create cool apps to flex their coding muscles. It\'s all about creativity, problem-solving, and showing off coding skills in a fun and challenging environment.', 'nov', '22', '22:13', 0, '2020/2/2'),
(3, 'WebCraft', 'Description: WebCraft is a competition where designers and developers showcase their creativity by crafting visually stunning and user-friendly web experiences, pushing the boundaries of digital design.', 'JAV', '30', '10:00', 0, '2022/22/2'),
(4, 'Coding Challenge', 'CodeQuest offers programmers a platform to tackle diverse coding challenges, from algorithmic puzzles to real-world application tasks, fostering skill development and competition in the coding community.', 'JAV', '30', '10:00', 0, '2022/22/2');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(255) NOT NULL,
  `day_event` varchar(255) NOT NULL,
  `month_event` varchar(255) NOT NULL,
  `time_event` varchar(255) NOT NULL,
  `title_event` varchar(255) NOT NULL,
  `description_event` varchar(2000) NOT NULL,
  `finished` int(255) NOT NULL,
  `date_announcement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `day_event`, `month_event`, `time_event`, `title_event`, `description_event`, `finished`, `date_announcement`) VALUES
(1, '24', 'NOV', '16:30', 'Cyber Security', 'Cyber Security: Safeguarding the Digital World. Join us to explore the latest trends, best practices, and tools to protect your online presence from cyber threats.', 0, '2024/2/2'),
(2, '25', 'YAN', '12:30', 'TechGuard Summit', 'Where cybersecurity experts converge to discuss the latest strategies in digital defense, offering valuable insights to protect against evolving cyber threats.', 0, '2024/2/2');

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE `groups` (
  `id` int(255) NOT NULL,
  `id_specific` int(255) NOT NULL,
  `name_group` int(255) NOT NULL,
  `group_finished` int(25) NOT NULL,
  `date_finished` date DEFAULT NULL,
  `date_created` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groups`
--

INSERT INTO `groups` (`id`, `id_specific`, `name_group`, `group_finished`, `date_finished`, `date_created`) VALUES
(1, 3, 20, 0, '2023-09-03', '2023-11-27'),
(2, 4, 2, 1, '2023-11-11', '2023-10-02'),
(3, 3, 3, 1, '0000-00-00', '2023-01-20'),
(4, 6, 4, 0, '0000-00-00', '2023-10-20'),
(17, 5, 1337, 0, NULL, '2023-10-31'),
(18, 5, 222, 1, '2023-11-11', '2023-11-11'),
(19, 4, 155, 0, NULL, '2023-11-11'),
(20, 3, 256, 0, NULL, '2023-11-12'),
(21, 5, 255, 1, '2023-11-12', '2023-11-12');

-- --------------------------------------------------------

--
-- Structure de la table `languages`
--

CREATE TABLE `languages` (
  `id` int(255) NOT NULL,
  `name_langauge` varchar(255) NOT NULL,
  `name_icon` varchar(244) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `id_collection` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `languages`
--

INSERT INTO `languages` (`id`, `name_langauge`, `name_icon`, `description`, `id_collection`) VALUES
(3, 'HTML5', 'TiHtml5', 'HTML5 is the latest version of the Hypertext Markup Language used for structuring web content. It introduces semantic elements, multimedia support, canvas for graphics, form enhancements, offline capabilities, and improved accessibility, empowering developers to create modern, interactive, and responsive websites.', 3),
(4, 'CSS3', 'DiCss3', 'CSS3 is the latest version of the CSS language used for styling web pages. It introduces new features like transitions, animations, flexbox, grid layouts, media queries, and more, enabling better design and responsiveness.', 3),
(5, 'JAVASCRIPT', 'TbBrandJavascript', 'JavaScript is a scripting language used for web development to make websites interactive and dynamic. It runs on the client-side in web browsers and can also be used on the server-side with Node.js. JavaScript enables developers to create engaging and responsive user experiences on the web.', 3),
(6, 'PHP', 'BsFiletypePhp', 'PHP is a popular server-side scripting language used for web development. It is embedded in HTML and used to create dynamic web pages, interact with databases, and handle various server-side tasks. PHP is known for its ease of use, wide community support, and ability to build dynamic and interactive websites.', 4);

-- --------------------------------------------------------

--
-- Structure de la table `level`
--

CREATE TABLE `level` (
  `id` int(255) NOT NULL,
  `id_user` int(255) DEFAULT NULL,
  `level` double DEFAULT NULL,
  `background` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `level`
--

INSERT INTO `level` (`id`, `id_user`, `level`, `background`) VALUES
(1, 2, 4.3, 30),
(24, 13, 3.1, 310),
(28, 79, 3.4, 40),
(29, 80, 0, 0),
(30, 81, 3.4, 40),
(31, 82, 3.4, 40),
(32, 83, 0, 0),
(33, 84, 3.4, 40),
(34, 85, 0, 0),
(35, 86, 1.7, 70),
(36, 87, 3.4, 40),
(37, 88, 0, 0),
(38, 89, 0, 0),
(39, 90, 3.4, 40),
(40, 91, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `links_languages`
--

CREATE TABLE `links_languages` (
  `id` int(255) NOT NULL,
  `id_language` int(255) NOT NULL,
  `name_link` varchar(500) DEFAULT NULL,
  `link` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `links_languages`
--

INSERT INTO `links_languages` (`id`, `id_language`, `name_link`, `link`) VALUES
(1, 3, 'first link', 'http/:this is the link ok'),
(2, 3, 'secend link', 'http/:this is the link ok'),
(3, 3, 'thired link', 'http/:this is the link ok'),
(4, 4, 'first link', 'http/:this is the link ok'),
(5, 5, 'first link', 'http/:this is the link ok'),
(6, 6, 'first link', 'http/:this is the link ok'),
(7, 3, 'Foor Link', 'this foor link'),
(8, 3, 'five Link', 'this foor link');

-- --------------------------------------------------------

--
-- Structure de la table `links_tools`
--

CREATE TABLE `links_tools` (
  `id` int(255) NOT NULL,
  `id_tools` int(255) NOT NULL,
  `name_link` varchar(255) NOT NULL,
  `link` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `links_tools`
--

INSERT INTO `links_tools` (`id`, `id_tools`, `name_link`, `link`) VALUES
(1, 1, 'first link', 'this is the link'),
(2, 1, 'secend link', 'this is the link'),
(3, 2, 'first link', 'this is the link'),
(4, 2, 'seceend link', 'this is the link'),
(5, 3, 'first link', 'this is the link'),
(6, 4, 'first link', 'this is the link');

-- --------------------------------------------------------

--
-- Structure de la table `more_info_projects`
--

CREATE TABLE `more_info_projects` (
  `id` int(255) NOT NULL,
  `id_project` int(255) NOT NULL,
  `context` varchar(3000) NOT NULL,
  `deliverables` varchar(3000) NOT NULL,
  `languages_used` varchar(500) NOT NULL,
  `finished_project` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `more_info_projects`
--

INSERT INTO `more_info_projects` (`id`, `id_project`, `context`, `deliverables`, `languages_used`, `finished_project`) VALUES
(1, 1, 'Votre page doit obligatoirement contenir les éléments suivants :  Un titre principal sur le nom de votre personnage  Un sous-titre qui le décrit  Une image  Une description de l’image  Une bio portant les dates clés et les meilleures réalisations  Un lien vers la page Wikipédia de votre personnage Vous trouverez dans les pièces jointes un modèle pour s’inspirer ; Pour la mise en style, vous avez le libre choix de disposer et styliser les éléments de votre page. Laisser votre créativité s’exprimer ;\r\n\r\n​\r\n\r\nDans un fichier word,vous décrivez les différentes balises HTML ainsi que les propriétés CSS que vous avez utilisé et notez leur utilité;', 'Dépôt dans le Drive (Un dossier portant votre nom et prénom, contenant la page HTML et CSS et le fichier WORD)', 'HTML5, CSS3', 'So you need to click on button to go on the next page and put your link of your project in the input and click finished'),
(2, 2, 'Votre page doit obligatoirement contenir les éléments suivants :  Un titre principal sur le nom de votre personnage  Un sous-titre qui le décrit  Une image  Une description de l’image  Une bio portant les dates clés et les meilleures réalisations  Un lien vers la page Wikipédia de votre personnage Vous trouverez dans les pièces jointes un modèle pour s’inspirer ; Pour la mise en style, vous avez le libre choix de disposer et styliser les éléments de votre page. Laisser votre créativité s’exprimer ;\r\n\r\n​\r\n\r\nDans un fichier word,vous décrivez les différentes balises HTML ainsi que les propriétés CSS que vous avez utilisé et notez leur utilité;', 'Dépôt dans le Drive (Un dossier portant votre nom et prénom, contenant la page HTML et CSS et le fichier WORD)', 'HTML5, CSS3, JS', 'So you need to click on button to go on the next page and put your link of your project in the input and click finished'),
(3, 3, 'Votre page doit obligatoirement contenir les éléments suivants :  Un titre principal sur le nom de votre personnage  Un sous-titre qui le décrit  Une image  Une description de l’image  Une bio portant les dates clés et les meilleures réalisations  Un lien vers la page Wikipédia de votre personnage Vous trouverez dans les pièces jointes un modèle pour s’inspirer ; Pour la mise en style, vous avez le libre choix de disposer et styliser les éléments de votre page. Laisser votre créativité s’exprimer ;\r\n\r\n​\r\n\r\nDans un fichier word,vous décrivez les différentes balises HTML ainsi que les propriétés CSS que vous avez utilisé et notez leur utilité;', 'Dépôt dans le Drive (Un dossier portant votre nom et prénom, contenant la page HTML et CSS et le fichier WORD)', 'HTML5, CSS3, JS', 'So you need to click on button to go on the next page and put your link of your project in the input and click finished');

-- --------------------------------------------------------

--
-- Structure de la table `name_specifics`
--

CREATE TABLE `name_specifics` (
  `id` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `shurt_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `name_specifics`
--

INSERT INTO `name_specifics` (`id`, `name`, `shurt_name`) VALUES
(3, 'Devlopment Web Front-end', 'D-W-F'),
(4, 'Devlopement Web Back-end', 'D-W-B'),
(5, 'Mobile Front-end', 'M-F'),
(6, 'Robotique', 'R'),
(7, 'Mobile Back-end', 'M-B');

-- --------------------------------------------------------

--
-- Structure de la table `payment`
--

CREATE TABLE `payment` (
  `id` int(255) NOT NULL,
  `payment` int(255) NOT NULL,
  `valid` int(25) NOT NULL,
  `date_payment` date NOT NULL,
  `id_user` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `payment`
--

INSERT INTO `payment` (`id`, `payment`, `valid`, `date_payment`, `id_user`) VALUES
(1, 1442, 1, '2024-12-23', 2),
(3, 300, 1, '2023-08-03', 13),
(21, 0, 0, '2024-01-08', 79),
(22, 0, 0, '2024-01-08', 80),
(23, 0, 0, '2024-01-11', 81),
(24, 0, 0, '2024-01-12', 82),
(25, 0, 0, '2024-01-12', 83),
(26, 0, 0, '2024-01-12', 84),
(27, 0, 0, '2024-01-12', 85),
(28, 0, 0, '2024-01-13', 86),
(29, 0, 0, '2024-01-14', 87),
(30, 0, 0, '2024-01-14', 88),
(31, 0, 0, '2024-01-14', 89),
(32, 0, 0, '2024-01-23', 90),
(33, 0, 0, '2024-01-25', 91);

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE `projects` (
  `id` int(255) NOT NULL,
  `name_project` varchar(255) NOT NULL,
  `count_exp` int(255) NOT NULL,
  `id_collection` int(255) NOT NULL,
  `image_project` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projects`
--

INSERT INTO `projects` (`id`, `name_project`, `count_exp`, `id_collection`, `image_project`, `description`) VALUES
(1, 'Create a biography of a character who inspires you', 100, 3, 'biographie.png', 'This involves creating a web page which presents the biography of a character of your choice (sportsman, scientist, artist, etc.) using HTML5 and CSS3;'),
(2, 'Reproduce a mockup and convert it to HTML and CSS.', 170, 3, 'biographie.png', 'You will reproduce a mock-up of a contact page which you will then have to translate into HTML and CSS based on the specifications provided.'),
(3, 'Design and create a responsive landing page', 70, 3, 'biographie.png', 'The objective of this brief is to adapt a model of your choice, in order to create 2 new models (Desktop/Mobile) for a responsive Landing page. Then you must translate your models into HTML and CSS code according to the instructions provided.'),
(4, 'Créer une interface utilisateur de gestion de produits qui interroge un fichier JSON', 90, 4, 'biographie.png', 'Créer un fichier JSON contenant les informations des produits de votre choix, exploiter ce fichier pour créer une page responsive qui permet d\'afficher ces données, les trier et les filtrer.');

-- --------------------------------------------------------

--
-- Structure de la table `push_porojects`
--

CREATE TABLE `push_porojects` (
  `id` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_teacher` int(255) DEFAULT NULL,
  `id_project` int(255) NOT NULL,
  `message_student` varchar(1000) DEFAULT NULL,
  `time_send_student` varchar(255) DEFAULT NULL,
  `message_teacher` varchar(1000) DEFAULT NULL,
  `time_send_teacher` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `push_porojects`
--

INSERT INTO `push_porojects` (`id`, `id_user`, `id_teacher`, `id_project`, `message_student`, `time_send_student`, `message_teacher`, `time_send_teacher`) VALUES
(1, 2, 1, 1, 'hi techer', '24/9/2023', NULL, NULL),
(2, 2, 2, 1, NULL, NULL, 'hi student', '24/9/2023'),
(3, 2, 1, 1, 'hi my teacher 2', '24/9/2023', NULL, NULL),
(4, 2, 1, 1, 'a aaa', '24/9/2023', NULL, NULL),
(5, 2, 2, 1, NULL, NULL, 'so what do you want', '24/9/2023'),
(6, 2, 1, 1, 'i want nothing', '24/9/2023', NULL, NULL),
(7, 13, 2, 1, NULL, NULL, 'i am the techer', '24/9/2023'),
(9, 2, 1, 1, 'dd', '24/9/2023', NULL, NULL),
(10, 2, 1, 1, 'ddd', '24/9/2023', NULL, NULL),
(11, 2, 1, 1, 'ddd', '24/9/2023', NULL, NULL),
(12, 2, 1, 1, 'cccc', '24/9/2023', NULL, NULL),
(14, 2, 2, 2, NULL, NULL, 'i am the admin ok', '24/9/2023'),
(15, 2, 2, 4, NULL, NULL, 'hi', '24/9/2023'),
(16, 2, 2, 1, NULL, NULL, 'ok', '25/9/2023'),
(17, 2, 1, 1, 'jddhd', '2/10/2023', NULL, NULL),
(18, 2, 1, 1, 'ddddd', '2/10/2023', NULL, NULL),
(19, 2, 1, 1, 'hi mehdi', '2/10/2023', NULL, NULL),
(20, 2, 1, 1, 'sdss', '2/10/2023', NULL, NULL),
(21, 2, 1, 1, 'hdhdhd', '4/10/2023', NULL, NULL),
(22, 2, 1, 1, 'abderahman', '4/10/2023', NULL, NULL),
(23, 2, 2, 2, NULL, NULL, 'hfhf', '4/10/2023'),
(24, 2, 1, 1, 'jdjdjdj', '5/10/2023', NULL, NULL),
(25, 2, 1, 1, 'ksskk', '7/10/2023', NULL, NULL),
(26, 2, 1, 1, 'mohamed', '7/10/2023', NULL, NULL),
(27, 2, 1, 1, 'yaasin', '7/10/2023', NULL, NULL),
(28, 2, 2, 1, NULL, NULL, 'bdbd', '7/10/2023'),
(29, 2, 1, 1, 'haahhaha', '9/10/2023', NULL, NULL),
(30, 2, 1, 1, 'http/github/houssame', '10/10/2023', NULL, NULL),
(31, 2, 1, 1, 'linki youssef', '10/10/2023', NULL, NULL),
(32, 2, 2, 1, NULL, NULL, 'thanks', '10/10/2023'),
(33, 2, 1, 1, 'rayan', '12/10/2023', NULL, NULL),
(34, 2, 2, 1, NULL, NULL, 'good project', '12/10/2023'),
(35, 2, 1, 1, 'this my link', '18/10/2023', NULL, NULL),
(36, 2, 1, 1, 'http//hakim', '23/10/2023', NULL, NULL),
(37, 2, 2, 1, NULL, NULL, 'good project', '23/10/2023'),
(38, 2, 1, 1, 'i am youssef ', '28/10/2023', NULL, NULL),
(39, 2, 1, 1, 'oussama', '30/10/2023', NULL, NULL),
(40, 2, 1, 1, 'abderzak', '31/10/2023', NULL, NULL),
(41, 2, 1, 1, 'madara', '31/10/2023', NULL, NULL),
(42, 2, 1, 1, 'http//abderahman', '3/11/2023', NULL, NULL),
(43, 2, 1, 1, 'hicham.;com', '20/12/2023', NULL, NULL),
(45, 2, 1, 1, 'haahahyosef', '21/12/2023', NULL, NULL),
(46, 2, 2, 1, NULL, NULL, 'good', '21/12/2023'),
(47, 2, 1, 1, 'youssef', '21/12/2023', NULL, NULL),
(48, 2, 1, 1, 'fatima', '23/12/2023', NULL, NULL),
(49, 2, 2, 1, NULL, NULL, 'good project', '23/12/2023'),
(50, 80, 1, 1, 'hi', '8/1/2024', NULL, NULL),
(51, 86, 1, 1, 'http//link', '13/1/2024', NULL, NULL),
(52, 86, 2, 1, NULL, NULL, 'greate project', '13/1/2024'),
(53, 89, 1, 2, 'dlm', '14/1/2024', NULL, NULL),
(54, 90, 1, 1, 'heyyo', '23/1/2024', NULL, NULL),
(55, 2, 1, 1, 'waeil', '29/2/2024', NULL, NULL),
(56, 2, 1, 1, 'd', '15/5/2024', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `registrement_competition`
--

CREATE TABLE `registrement_competition` (
  `id` int(255) NOT NULL,
  `id_user` int(255) DEFAULT NULL,
  `id_competition` int(255) DEFAULT NULL,
  `valid` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `registrement_competition`
--

INSERT INTO `registrement_competition` (`id`, `id_user`, `id_competition`, `valid`) VALUES
(3, 13, 2, 0),
(34, 90, 2, 0),
(35, 90, 3, 0),
(52, 2, 2, 0);

-- --------------------------------------------------------

--
-- Structure de la table `registrement_events`
--

CREATE TABLE `registrement_events` (
  `id` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_event` int(255) NOT NULL,
  `valid` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `registrement_events`
--

INSERT INTO `registrement_events` (`id`, `id_user`, `id_event`, `valid`) VALUES
(31, 13, 2, 0),
(85, 86, 2, 0),
(86, 79, 1, 0),
(87, 79, 2, 0),
(89, 90, 1, 0),
(91, 2, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `ressources_projects`
--

CREATE TABLE `ressources_projects` (
  `id` int(255) NOT NULL,
  `id_project` int(255) NOT NULL,
  `name_ressource` varchar(255) NOT NULL,
  `link_ressource` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ressources_projects`
--

INSERT INTO `ressources_projects` (`id`, `id_project`, `name_ressource`, `link_ressource`) VALUES
(1, 1, 'Model.png', 'link of model'),
(2, 1, 'tutorial', 'link of model'),
(3, 1, 'Maquette', 'put link here'),
(4, 1, 'Font Awesome', 'put link here'),
(5, 2, 'Tutrial', 'https://www.instagram.com]'),
(6, 2, 'Font Awesome', '[value-4]'),
(7, 2, 'Model', '[value-3]'),
(8, 2, 'Maquette', '[value-3]'),
(9, 3, 'Tuturial', '[value-3]'),
(10, 3, 'Maquette', '[value-3]'),
(11, 3, 'Model', '[value-3]'),
(12, 3, 'Font Aesome', '[value-3]');

-- --------------------------------------------------------

--
-- Structure de la table `specifics`
--

CREATE TABLE `specifics` (
  `id` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_nameSpecifics` int(255) NOT NULL,
  `study_now` int(255) NOT NULL,
  `validation` int(255) NOT NULL,
  `validation_week` int(255) NOT NULL,
  `id_group` int(255) NOT NULL,
  `date_register` date NOT NULL,
  `date_validation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `specifics`
--

INSERT INTO `specifics` (`id`, `id_user`, `id_nameSpecifics`, `study_now`, `validation`, `validation_week`, `id_group`, `date_register`, `date_validation`) VALUES
(3, 2, 3, 1, 1, 1, 1, '2024-03-03', '2023-09-14'),
(4, 2, 4, 0, 0, 1, 2, '2020-02-03', NULL),
(8, 13, 3, 1, 1, 1, 1, '2020-02-03', '2023-09-14'),
(11, 32, 6, 1, 0, 0, 4, '2023-09-20', NULL),
(24, 2, 5, 0, 1, 0, 17, '2025-03-03', '2025-06-04'),
(53, 79, 3, 1, 1, 1, 20, '2024-01-08', '2024-01-12'),
(54, 80, 3, 1, 0, 0, 20, '2024-01-08', NULL),
(55, 81, 3, 1, 1, 1, 20, '2024-01-11', '2024-01-13'),
(56, 82, 3, 1, 1, 0, 20, '2024-01-12', '2024-01-12'),
(57, 83, 3, 1, 0, 0, 20, '2024-01-12', NULL),
(58, 84, 3, 1, 1, 1, 20, '2024-01-12', '2024-01-12'),
(59, 85, 3, 1, 0, 0, 20, '2024-01-12', NULL),
(60, 86, 3, 1, 0, 0, 20, '2024-01-13', NULL),
(61, 87, 3, 1, 1, 1, 20, '2024-01-14', '2024-01-14'),
(62, 88, 3, 1, 0, 0, 20, '2024-01-14', NULL),
(63, 89, 3, 1, 0, 0, 20, '2024-01-14', NULL),
(64, 90, 3, 1, 1, 0, 20, '2024-01-23', '2024-01-23'),
(65, 91, 3, 1, 0, 0, 20, '2024-01-25', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number_phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `teachers`
--

INSERT INTO `teachers` (`id`, `first_name`, `last_name`, `email`, `number_phone`, `address`, `image`) VALUES
(1, 'omar', 'hajji', 'hajjikarim530@gmail.com', '0617591321', 'rue mohamed ben abdelouahabe', NULL),
(2, 'admin', 'admin', 'admin@gamil.com', '617591321', 'rue hassan 2', 'karim.png');

-- --------------------------------------------------------

--
-- Structure de la table `teacher_groups`
--

CREATE TABLE `teacher_groups` (
  `id` int(255) NOT NULL,
  `id_teacher` int(255) NOT NULL,
  `id_group` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `teacher_groups`
--

INSERT INTO `teacher_groups` (`id`, `id_teacher`, `id_group`) VALUES
(1, 1, 1),
(13, 1, 17),
(14, 2, 18),
(15, 1, 19),
(16, 1, 20),
(17, 2, 21);

-- --------------------------------------------------------

--
-- Structure de la table `tools`
--

CREATE TABLE `tools` (
  `id` int(255) NOT NULL,
  `name_tool` varchar(255) NOT NULL,
  `name_icon` varchar(255) NOT NULL,
  `id_collection` int(255) NOT NULL,
  `description` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tools`
--

INSERT INTO `tools` (`id`, `name_tool`, `name_icon`, `id_collection`, `description`) VALUES
(1, 'github', 'BiLogoGithub', 3, 'GitHub is a web platform used for sharing and collaborating on software code. It helps developers work together, manage versions of code, and track changes over time. It\'s widely used for open-source projects and provides tools for issue tracking, code reviews, and continuous integration.'),
(2, 'VS code', 'TbBrandVscode', 3, 'Visual Studio Code (VS Code): A fast, cross-platform source-code editor with smart coding features, extensions, and debugging tools, suitable for various programming languages and tasks.'),
(3, 'figma', 'FiFigma', 3, 'Figma: An online design and prototyping tool used by designers to create user interfaces, collaborate in real-time, and turn design concepts into interactive prototypes for web and app development.'),
(4, 'VS code', 'TbBrandVscode', 4, 'Visual Studio Code (VS Code): A fast, cross-platform source-code editor with smart coding features, extensions, and debugging tools, suitable for various programming languages and tasks.'),
(5, 'github', 'BiLogoGithub', 4, 'GitHub is a web platform used for sharing and collaborating on software code. It helps developers work together, manage versions of code, and track changes over time. It\'s widely used for open-source projects and provides tools for issue tracking, code reviews, and continuous integration.'),
(6, 'xampp', 'SiXampp', 4, 'XAMPP: A free, open-source software package that provides a local server environment for web development. It includes Apache, MySQL, PHP, and Perl, allowing developers to set up a web server on their computer for testing and development purposes.');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` varchar(400) DEFAULT NULL,
  `date_registered` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstName`, `password`, `lastName`, `email`, `phone`, `image`, `date_registered`) VALUES
(2, 'Abdelkarim', 'karim', 'hajji', 'hajji@gmail.com', '0617591321', 'karim.png', '2024-03-20'),
(13, 'nassim', 'achab', 'achab', 'achab@gamil.com', '0617591321', 'oussama.png', '2023-02-10'),
(32, 'hicham', '@hajjicode', 'hajji', 'hicham@gmail.com', '0617591321', 'ahajji.jpg', '2023-09-20'),
(79, 'Abdelkarim', '@ahajji', 'Hajji', 'ahajji@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/d12cd5a31ca3cecff426bbbf5e5e4aec/medium_ahajji.jpg', '2024-01-08'),
(80, 'Nassim', '@nachab', 'Achab', 'nachab@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/0f112b961272e37b01b805b7ec9279ad/medium_nachab.jpg', '2024-01-08'),
(81, 'Amine', '@asalmi', 'Salmi', 'asalmi@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/198b5cb321a2b0d3642ff2aba96c7714/medium_asalmi.jpg', '2024-01-11'),
(82, 'Youssef', '@ylabrahm', 'Labrahmi', 'ylabrahm@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/84814d5acae61a80deca26986402bd54/medium_ylabrahm.jpg', '2024-01-12'),
(83, 'Ayoub', '@aech-che', 'Ech-Chetyouy', 'aech-che@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/39341d40e39057ec142afc077f1f9fa5/medium_aech-che.jpg', '2024-01-12'),
(84, 'Abderrazzak', '@aechaoub', 'Echaoubi', 'aechaoub@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/419855509671b0052ed65cb3eebe3250/medium_aechaoub.jpg', '2024-01-12'),
(85, 'Mohamed', '@mel-akhd', 'El akhdar', 'mel-akhd@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/a8477982cfa837f8363a568a82c30472/medium_mel-akhd.jpg', '2024-01-12'),
(86, 'Nabil', '@nhayoun', 'Hayoun', 'hayounn.etd@gmail.com', 'null', 'https://cdn.intra.42.fr/users/a43c3a7b3a200db8b4238f8b19501058/medium_nhayoun.jpg', '2024-01-13'),
(87, 'Yassine', '@yaidriss', 'Idrissi', 'yaidriss@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/4288ad90963abeb88d0df99e420761f5/medium_yaidriss.jpg', '2024-01-14'),
(88, 'Rachid', '@rennatiq', 'Ennatiqi', 'rennatiq@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/9978f3e0a77ae6dea12abe4ebd0604b6/medium_rennatiq.jpg', '2024-01-14'),
(89, 'Ahmed', '@asekkak', 'Sekak', 'asekkak@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/07627870cd855c4b13d6242e114f3f44/medium_asekkak.jpg', '2024-01-14'),
(90, 'Amine', '@ael-mhar', 'El Mharzi', 'ael-mhar@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/9992c6d85f1a8cc118297d718d6db71e/medium_ael-mhar.jpg', '2024-01-23'),
(91, 'Youssef', '@youel-id', 'El Idrissi', 'youel-id@student.1337.ma', 'null', 'https://cdn.intra.42.fr/users/94c9b98a52e9626e9c5244c484053b51/medium_youel-id.jpg', '2024-01-25');

-- --------------------------------------------------------

--
-- Structure de la table `validation_projects`
--

CREATE TABLE `validation_projects` (
  `id` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_project` int(255) NOT NULL,
  `id_teacher_validation` int(255) NOT NULL,
  `valid_project` int(255) NOT NULL,
  `date_validation` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `validation_projects`
--

INSERT INTO `validation_projects` (`id`, `id_user`, `id_project`, `id_teacher_validation`, `valid_project`, `date_validation`) VALUES
(1, 2, 1, 1, 1, '2024-01-04'),
(2, 2, 2, 1, 1, '2024-01-04'),
(3, 13, 1, 1, 1, '2024-01-04'),
(5, 13, 2, 2, 1, '2024-01-04'),
(7, 2, 3, 2, 1, '2024-01-04'),
(8, 13, 3, 2, 1, '2024-01-04'),
(10, 2, 4, 2, 0, '2023-09-11'),
(25, 79, 1, 2, 1, '2024-01-08'),
(26, 79, 2, 2, 1, '2024-01-08'),
(27, 79, 3, 2, 1, '2024-01-08'),
(28, 82, 1, 2, 1, '2024-01-12'),
(29, 82, 2, 2, 1, '2024-01-12'),
(30, 82, 3, 2, 1, '2024-01-12'),
(31, 84, 1, 2, 1, '2024-01-12'),
(32, 84, 2, 2, 1, '2024-01-12'),
(33, 84, 3, 2, 1, '2024-01-12'),
(34, 83, 1, 2, 1, '2024-01-13'),
(35, 86, 2, 2, 1, '2024-01-13'),
(36, 81, 1, 2, 1, '2024-01-13'),
(37, 81, 2, 2, 1, '2024-01-13'),
(38, 81, 3, 2, 1, '2024-01-13'),
(39, 87, 1, 2, 1, '2024-01-14'),
(40, 87, 2, 2, 1, '2024-01-14'),
(41, 87, 3, 2, 1, '2024-01-14'),
(43, 90, 1, 2, 1, '2024-01-23'),
(44, 90, 3, 2, 1, '2024-01-23'),
(45, 90, 2, 2, 1, '2024-01-23');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_specific` (`id_specific`);

--
-- Index pour la table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_collection` (`id_collection`);

--
-- Index pour la table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `links_languages`
--
ALTER TABLE `links_languages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_language` (`id_language`);

--
-- Index pour la table `links_tools`
--
ALTER TABLE `links_tools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tools` (`id_tools`);

--
-- Index pour la table `more_info_projects`
--
ALTER TABLE `more_info_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_project` (`id_project`);

--
-- Index pour la table `name_specifics`
--
ALTER TABLE `name_specifics`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_collection` (`id_collection`);

--
-- Index pour la table `push_porojects`
--
ALTER TABLE `push_porojects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_project` (`id_project`),
  ADD KEY `id_teacher` (`id_teacher`);

--
-- Index pour la table `registrement_competition`
--
ALTER TABLE `registrement_competition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_competition` (`id_competition`);

--
-- Index pour la table `registrement_events`
--
ALTER TABLE `registrement_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_event` (`id_event`);

--
-- Index pour la table `ressources_projects`
--
ALTER TABLE `ressources_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_project` (`id_project`);

--
-- Index pour la table `specifics`
--
ALTER TABLE `specifics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_nameSpecifics` (`id_nameSpecifics`),
  ADD KEY `id_group` (`id_group`);

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `teacher_groups`
--
ALTER TABLE `teacher_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_teacher` (`id_teacher`),
  ADD KEY `id_group` (`id_group`);

--
-- Index pour la table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_collection` (`id_collection`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `validation_projects`
--
ALTER TABLE `validation_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_project` (`id_project`),
  ADD KEY `id_teacher_validation` (`id_teacher_validation`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `competitions`
--
ALTER TABLE `competitions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `links_languages`
--
ALTER TABLE `links_languages`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `links_tools`
--
ALTER TABLE `links_tools`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `more_info_projects`
--
ALTER TABLE `more_info_projects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `name_specifics`
--
ALTER TABLE `name_specifics`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `push_porojects`
--
ALTER TABLE `push_porojects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pour la table `registrement_competition`
--
ALTER TABLE `registrement_competition`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `registrement_events`
--
ALTER TABLE `registrement_events`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `ressources_projects`
--
ALTER TABLE `ressources_projects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `specifics`
--
ALTER TABLE `specifics`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT pour la table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `teacher_groups`
--
ALTER TABLE `teacher_groups`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `validation_projects`
--
ALTER TABLE `validation_projects`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`id_specific`) REFERENCES `name_specifics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `languages`
--
ALTER TABLE `languages`
  ADD CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`id_collection`) REFERENCES `name_specifics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `level`
--
ALTER TABLE `level`
  ADD CONSTRAINT `level_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `links_languages`
--
ALTER TABLE `links_languages`
  ADD CONSTRAINT `links_languages_ibfk_1` FOREIGN KEY (`id_language`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `links_tools`
--
ALTER TABLE `links_tools`
  ADD CONSTRAINT `links_tools_ibfk_1` FOREIGN KEY (`id_tools`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `more_info_projects`
--
ALTER TABLE `more_info_projects`
  ADD CONSTRAINT `more_info_projects_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`id_collection`) REFERENCES `name_specifics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `push_porojects`
--
ALTER TABLE `push_porojects`
  ADD CONSTRAINT `push_porojects_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `push_porojects_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `push_porojects_ibfk_3` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `registrement_competition`
--
ALTER TABLE `registrement_competition`
  ADD CONSTRAINT `registrement_competition_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registrement_competition_ibfk_2` FOREIGN KEY (`id_competition`) REFERENCES `competitions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `registrement_events`
--
ALTER TABLE `registrement_events`
  ADD CONSTRAINT `registrement_events_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registrement_events_ibfk_2` FOREIGN KEY (`id_event`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ressources_projects`
--
ALTER TABLE `ressources_projects`
  ADD CONSTRAINT `ressources_projects_ibfk_1` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `specifics`
--
ALTER TABLE `specifics`
  ADD CONSTRAINT `specifics_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `specifics_ibfk_2` FOREIGN KEY (`id_nameSpecifics`) REFERENCES `name_specifics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `specifics_ibfk_4` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `teacher_groups`
--
ALTER TABLE `teacher_groups`
  ADD CONSTRAINT `teacher_groups_ibfk_1` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_groups_ibfk_2` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tools`
--
ALTER TABLE `tools`
  ADD CONSTRAINT `tools_ibfk_1` FOREIGN KEY (`id_collection`) REFERENCES `name_specifics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `validation_projects`
--
ALTER TABLE `validation_projects`
  ADD CONSTRAINT `validation_projects_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `validation_projects_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `validation_projects_ibfk_3` FOREIGN KEY (`id_teacher_validation`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
