-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 02. Mai 2021 um 17:40
-- Server-Version: 10.1.21-MariaDB
-- PHP-Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `guarded-worlds`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gw_characters`
--

CREATE TABLE `gw_characters` (
  `uid` int(11) NOT NULL,
  `base_name_main` tinytext NOT NULL,
  `base_name_nick` tinytext NOT NULL,
  `base_name_hidden` tinytext NOT NULL,
  `base_race_id` tinyint(4) NOT NULL,
  `base_gender` tinytext NOT NULL,
  `base_age` int(11) NOT NULL,
  `base_height` int(11) NOT NULL,
  `base_weight` int(11) NOT NULL,
  `base_figure_id` tinyint(4) NOT NULL,
  `base_origin` tinytext NOT NULL,
  `base_lineage` tinytext NOT NULL,
  `base_language_ids` text NOT NULL,
  `base_education_id` int(11) NOT NULL,
  `base_education` longtext NOT NULL,
  `base_rank` int(11) NOT NULL,
  `base_reputation` int(11) NOT NULL,
  `base_karma` int(11) NOT NULL,
  `base_xp` text NOT NULL,
  `base_level` int(11) NOT NULL,
  `attributes` longtext NOT NULL,
  `skills_main` longtext NOT NULL,
  `skills_fight` longtext NOT NULL,
  `skills_magic` longtext NOT NULL,
  `inventory` longtext NOT NULL,
  `inventory_extention` longtext NOT NULL,
  `money` longtext NOT NULL,
  `extra_history` longtext NOT NULL,
  `extra_notes` longtext NOT NULL,
  `extra_informations` longtext NOT NULL,
  `media` blob NOT NULL,
  `entry_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_hidden` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='media';

--
-- Daten für Tabelle `gw_characters`
--

INSERT INTO `gw_characters` (`uid`, `base_name_main`, `base_name_nick`, `base_name_hidden`, `base_race_id`, `base_gender`, `base_age`, `base_height`, `base_weight`, `base_figure_id`, `base_origin`, `base_lineage`, `base_language_ids`, `base_education_id`, `base_education`, `base_rank`, `base_reputation`, `base_karma`, `base_xp`, `base_level`, `attributes`, `skills_main`, `skills_fight`, `skills_magic`, `inventory`, `inventory_extention`, `money`, `extra_history`, `extra_notes`, `extra_informations`, `media`, `entry_created`, `entry_modified`, `entry_hidden`) VALUES
(1, 'Test Player', 'Test', 'Hidden Name', 1, 'male', 35, 128, 70, 2, 'Origin story', 'linage story', '1', 1, '2', 1, 0, 0, '{\"total\":100,\"used\":0}', 1, '[{\"type\":\"normal\",\"data\":[{\"type\":\"charisma\",\"value\":5,\"short\":\"AUS\"},{\"type\":\"dexterity\",\"value\":10,\"short\":\"BEW\"},{\"type\":\"intuition\",\"value\":9,\"short\":\"INT\"},{\"type\":\"constitution\",\"value\":6,\"short\":\"KON\"},{\"type\":\"mystic\",\"value\":12,\"short\":\"MYS\"},{\"type\":\"strength\",\"value\":9,\"short\":\"STA\"},{\"type\":\"intelligence\",\"value\":11,\"short\":\"VER\"},{\"type\":\"willpower\",\"value\":4,\"short\":\"WIL\"}]},{\"type\":\"special\",\"data\":[{\"type\":\"size\",\"value\":8,\"short\":\"GK\"},{\"type\":\"speed\",\"value\":6,\"short\":\"GSW\"},{\"type\":\"initative\",\"value\":9,\"short\":\"INI\"},{\"type\":\"health\",\"value\":96,\"short\":\"LP\"},{\"type\":\"mana\",\"value\":121,\"short\":\"FK\"},{\"type\":\"defense\",\"value\":9,\"short\":\"VTD\"},{\"type\":\"mental_willpower\",\"value\":11,\"short\":\"GW\"},{\"type\":\"body_willpower\",\"value\":4,\"short\":\"KW\"}]}]', '[{\"category\":\"Akrobatik\",\"data\":[{\"title\":\"Springen\",\"value\":20},{\"title\":\"Heben\",\"value\":11},{\"title\":\"test\",\"value\":12},{\"title\":\"testnext\",\"value\":120},{\"title\":\"spring\",\"value\":12}]},{\"category\":\"Athletik\",\"data\":[{\"title\":\"Rennen\",\"value\":15},{\"title\":\"Tragen\",\"value\":10},{\"title\":\"spring\",\"value\":12}]},{\"category\":\"Fingerfertigkeit\",\"data\":[{\"title\":\"Knoten\",\"value\":15},{\"title\":\"Naehen\",\"value\":10}]},{\"category\":\"Redegewandtheit\",\"data\":[{\"title\":\"Unterhalten\",\"value\":30},{\"title\":\"Luegen\",\"value\":20},{\"title\":\"Feilschen\",\"value\":10}]},{\"category\":\"Wissen\",\"data\":[{\"title\":\"Geschichten und Mythen\",\"value\":20},{\"title\":\"Laenderkunde\",\"value\":20},{\"title\":\"Religionskunde\",\"value\":10},{\"title\":\"Naturkundekunde\",\"value\":25}]},{\"category\":\"Zwischenmenschlich\",\"data\":[{\"title\":\"Empathie\",\"value\":10},{\"title\":\"Schauspiel\",\"value\":15}]},{\"category\":\"Persoenlich\",\"data\":[{\"title\":\"Entschlossenheit\",\"value\":15},{\"title\":\"Wahrnehmung\",\"value\":22},{\"title\":\"Zaehigkeit\",\"value\":30}]},{\"category\":\"Tierfuehrung\",\"data\":[{\"title\":\"Reiten Pferd\",\"value\":15},{\"title\":\"Pferdepflege\",\"value\":10},{\"title\":\"Verarzten (Pferd)\",\"value\":10}]},{\"category\":\"Heilkunde\",\"data\":[{\"title\":\"Wunden naehen\",\"value\":15},{\"title\":\"Heilmittel herstellen\",\"value\":20},{\"title\":\"Verbinden\",\"value\":10},{\"title\":\"Diagnose Krankheiten\",\"value\":10}]},{\"category\":\"Handwerk\",\"data\":[{\"title\":\"Kochen\",\"value\":10}]},{\"category\":\"Alchemie\",\"data\":[{\"title\":\"Drogenherstellung\",\"value\":20}]},{\"category\":\"Tierwissen\",\"data\":[{\"title\":\"Pferd\",\"value\":13}]},{\"category\":\"Test\",\"data\":[]},{\"category\":\"Test\",\"data\":[{\"title\":\"spring\",\"value\":12},{\"title\":\"spring\",\"value\":93}]}]', '[{\"category\":\"Klingenwaffen\",\"data\":[{\"title\":\"Dolch (70/30)\",\"value\":30},{\"title\":\"spring\",\"value\":12}]},{\"category\":\"Handgemenge\",\"data\":[{\"title\":\"Kratzen (80/20)\",\"value\":20},{\"title\":\"Boxen (30/70)\",\"value\":5},{\"title\":\"Gift (50/50)\",\"value\":10}]},{\"category\":\"Schusswaffen\",\"data\":[{\"title\":\"Gewehr (100/0)\",\"value\":5}]},{\"category\":\"Test2\",\"data\":[{\"title\":\"spring7\",\"value\":90}]}]', '[{\"category\":\"Dunkle Magie\",\"data\":[{\"title\":\"Nekromantie\",\"value\":41},{\"title\":\"Dunkle Spaehre\",\"value\":10},{\"title\":\"Gabe der Schatten\",\"value\":20}]},{\"category\":\"Eismagie\",\"data\":[{\"title\":\"Eisball\",\"value\":10},{\"title\":\"Eisschild\",\"value\":10},{\"title\":\"Funkelnde Scherbe\",\"value\":10}]}]', '{}', '{}', '{\"bank\":{},\"mobile\":{}}', 'extra history', '', '', '', '2020-11-16 18:06:27', '2020-11-16 18:06:27', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gw_items`
--

CREATE TABLE `gw_items` (
  `uid` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `description` text NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `attributes` mediumtext NOT NULL,
  `media` blob NOT NULL,
  `entry_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_hidden` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gw_item_types`
--

CREATE TABLE `gw_item_types` (
  `uid` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `entry_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `entry_hidden` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `gw_item_types`
--

INSERT INTO `gw_item_types` (`uid`, `title`, `entry_created`, `entry_modified`, `entry_hidden`) VALUES
(1, 'Weapon', '2021-01-15 13:16:28', '2021-01-15 13:16:28', 0),
(2, 'Verbrauchsgegenstand', '2021-01-15 15:05:55', '2021-01-15 15:05:55', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `gw_characters`
--
ALTER TABLE `gw_characters`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `uid_2` (`uid`);

--
-- Indizes für die Tabelle `gw_items`
--
ALTER TABLE `gw_items`
  ADD PRIMARY KEY (`uid`);

--
-- Indizes für die Tabelle `gw_item_types`
--
ALTER TABLE `gw_item_types`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `gw_characters`
--
ALTER TABLE `gw_characters`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `gw_items`
--
ALTER TABLE `gw_items`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `gw_item_types`
--
ALTER TABLE `gw_item_types`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
