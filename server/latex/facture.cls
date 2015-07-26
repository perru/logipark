\ProvidesClass{facture}

\LoadClass[a4paper,11pt]{article}

\RequirePackage[french]{babel}
\RequirePackage[T1]{fontenc}
\RequirePackage[utf8]{inputenc}
\RequirePackage{textcomp}
\RequirePackage[a4paper]{geometry}
\RequirePackage{units}
\RequirePackage{graphicx}
\RequirePackage{fancyhdr}
\RequirePackage{fp}
\RequirePackage{eurosym}
\RequirePackage{numprint}

\def\TVAOne{19.6}	% Taux de la TVA 1
\def\TVATwo{5.5}	% Taux de la TVA 2
\def\TVAThree{7.0}	% Taux de la TVA 3

\def\TotalHT{0}
\def\TotalHTOne{0}
\def\TotalHTTwo{0}
\def\TotalHTThree{0}
\def\TotalTVAOne{0}
\def\TotalTVATwo{0}
\def\TotalTVAThree{0}

\newcommand{\AjouterProduit}[4]{ % Arguments : Désignation, quantité, prix unitaire HT, taux_tva
	\FPround{\prix}{#3}{2}
	\FPeval{\montant}{#2 * #3}
	\FPround{\montant}{\montant}{2}
	\ifthenelse{\equal{#4}{19.6}}{
		\FPadd{\TotalHTOne}{\TotalHTOne}{\montant}
	}{
		\ifthenelse{\equal{#4}{5.5}}{
			\FPadd{\TotalHTTwo}{\TotalHTTwo}{\montant}
		}{
			\ifthenelse{\equal{#4}{7.0}}{
				\FPadd{\TotalHTThree}{\TotalHTThree}{\montant}
			}{}
		}
	}
	\FPadd{\TotalHT}{\TotalHT}{\montant}

	%\eaddto\ListeProduits{#1 & \numprint{\prix}~\euro & \numprint{#4}\% & \numprint{#2} & \numprint{\montant}~\euro \cr}
	\eaddto\ListeProduits{#1 & \prix & #4 & #2 & \montant \cr}
}

\newcommand{\AfficheResultat}{
	\ListeProduits

	\FPeval{\TotalTVAOne}{\TotalHTOne * \TVAOne / 100}
	\FPeval{\TotalTVATwo}{\TotalHTTwo * \TVATwo / 100}
	\FPeval{\TotalTVAThree}{\TotalHTThree * \TVAThree / 100}
	\FPeval{\TotalTTC}{\TotalHT + \TotalTVAOne + \TotalTVATwo + \TotalTVAThree}
	\FPround{\TotalHT}{\TotalHT}{2}
	\FPround{\TotalTVAOne}{\TotalTVAOne}{2}
	\FPround{\TotalTVATwo}{\TotalTVATwo}{2}
	\FPround{\TotalTVAThree}{\TotalTVAThree}{2}
	\FPround{\TotalTTC}{\TotalTTC}{2}
	\global\let\TotalHT\TotalHT
	\global\let\TotalHTOne\TotalHTOne
	\global\let\TotalHTTwo\TotalHTTwo
	\global\let\TotalHTThree\TotalHTThree
	\global\let\TotalTVAOne\TotalTVAOne
	\global\let\TotalTVATwo\TotalTVATwo
	\global\let\TotalTVAThree\TotalTVAThree
	\global\let\TotalTTC\TotalTTC

	\cr \hline
	Total HT & & & & \numprint{\TotalHT}~\euro \\
	TVA \numprint{\TVAOne}\% & & & & \numprint{\TotalTVAOne}~\euro \\
	TVA \numprint{\TVATwo}\% & & & & \numprint{\TotalTVATwo}~\euro \\
	TVA \numprint{\TVAThree}\% & & & & \numprint{\TotalTVAThree}~\euro \\
	\hline \hline
	\textbf{Total TTC} & & & & \numprint{\TotalTTC}~\euro
}

\newcommand*\eaddto[2]{% version développée de \addto
   \edef\tmp{#2}%
   \expandafter\addto
   \expandafter#1%
   \expandafter{\tmp}%
} 

\newcommand{\ListeProduits}{}

