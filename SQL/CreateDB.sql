DROP TABLE IF EXISTS `Set`;
DROP TABLE IF EXISTS `Game`;
DROP TABLE IF EXISTS `PlayerRank`;
DROP TABLE IF EXISTS `TeamGame`;
DROP TABLE IF EXISTS `Team`;
DROP TABLE IF EXISTS `Player`;
DROP TABLE IF EXISTS `Club`;
DROP TABLE IF EXISTS `League`;
DROP TABLE IF EXISTS `Season`;
DROP TABLE IF EXISTS `Rank`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Contact`;

Create Table Contact(
	ContactId int not null AUTO_INCREMENT,
	PhoneNumber varchar(20),
	Email varchar(100),
	Street varchar(200),
	StreetNumber varchar(10),
	PostalCode varchar(10),
	City varchar(100),
	WebSite varchar(100),
	ContactName varchar(100),
	CONSTRAINT PK_CONTACT PRIMARY KEY (ContactId)
);

Create Table Category(
	CategoryId int not null AUTO_INCREMENT,
	Name varchar(100),
	CONSTRAINT PK_CATEGORY PRIMARY KEY (CategoryId)
);

Create Table Rank (
	RankId int not null AUTO_INCREMENT,
	Code varchar(3),
	MinimumPoint int,
	MaximumPoint int,
	CONSTRAINT PK_RANK PRIMARY KEY (RankId)
);

Create Table Season (
	SeasonId int not null AUTO_INCREMENT,
	Name varchar(100),
	IsCurrent bit,
	BeginDate date,
	EndDate date,
	CONSTRAINT PK_SEASON PRIMARY KEY (SeasonId)
);

Create Table League(
	LeagueId int not null AUTO_INCREMENT,
	Name varchar(100),
	CONSTRAINT PK_LEAGUE PRIMARY KEY (LeagueId)
);

Create Table Club (
	ClubId int not null AUTO_INCREMENT,
	ContactId int not null,
	Name varchar(100),
	CONSTRAINT PK_CLUB PRIMARY KEY (ClubId),
	CONSTRAINT FK_CLUB_CONTACT FOREIGN KEY (ContactId) REFERENCES Contact(ContactId)
);

Create Table Player (
	PlayerId int not null AUTO_INCREMENT, 
	ClubId int not null,
	CategoryId int not null,
	LastName varchar(100),
	FirstName varchar(100),
	LicenseNumber varchar(20),
	Gender enum('M', 'F'),
	CONSTRAINT PK_PLAYER PRIMARY KEY (PlayerId),
	CONSTRAINT FK_PlAYER_CLUB FOREIGN KEY (ClubId) REFERENCES Club(ClubId),
	CONSTRAINT FK_PlAYER_CATEGORY FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

Create Table Team (
	TeamId int not null AUTO_INCREMENT,
	ClubId int not null,
	Name varchar(100),
	CONSTRAINT PK_TEAM PRIMARY KEY (TeamId),
	CONSTRAINT FK_TEAM_CLUB FOREIGN KEY (ClubId) REFERENCES Club(ClubId)
);

Create Table TeamGame (
	TeamGameId int not null,
	SeasonId int not null,
	LeagueId int not null,
	HomeTeamId int not null,
	ForeignTeamId int not null,
	WinnerId int not null,
	GameNumber int not null,
	Date date,
	CONSTRAINT PK_TEAMGAME PRIMARY KEY (TeamGameId),
	CONSTRAINT FK_TEAMGAME_SEASON FOREIGN KEY (SeasonId) REFERENCES Season(SeasonId),
	CONSTRAINT FK_TEAMGAME_LEAGUE FOREIGN KEY (LeagueId) REFERENCES League(LeagueId),
	CONSTRAINT FK_TEAMGAME_HOMETEAM FOREIGN KEY (HomeTeamId) REFERENCES Team(TeamId),
	CONSTRAINT FK_TEAMGAME_FOREIGNTEAM FOREIGN KEY (ForeignTeamId) REFERENCES Team(TeamId),
	CONSTRAINT FK_TEAMGAME_WINNER FOREIGN KEY (WinnerId) REFERENCES Player(PlayerId)
);

Create Table PlayerRank (
	PlayerRankId int not null AUTO_INCREMENT,
	PlayerId int not null,
	RankId int not null,
	SeasonId int not null,
	Point int not null,
	UpdatedDate date,
	CONSTRAINT PK_PLAYERRANK PRIMARY KEY (PlayerRankId),
	CONSTRAINT FK_PLAYERRANK_PLAYER FOREIGN KEY (PlayerId) REFERENCES Player(PlayerId),
	CONSTRAINT FK_PLAYERRANK_RANK FOREIGN KEY (RankId) REFERENCES Rank(RankId),
	CONSTRAINT FK_PLAYERRANK_SEASON FOREIGN KEY (SeasonId) REFERENCES Season(SeasonId) 
);

Create Table Game (
	GameId int not null AUTO_INCREMENT,
	TeamGameId int null,
	WinnerId int not null,
	LooserId int not null,
	Date date,
	IsTechnicalLoose bit,
	CONSTRAINT PK_GAME PRIMARY KEY (GameId),
	CONSTRAINT FK_GAME_TEAMGAME FOREIGN KEY (TeamGameId) REFERENCES TeamGame(TeamGameId),
	CONSTRAINT FK_GAME_WINNER FOREIGN KEY (WinnerId) REFERENCES Player(PlayerId),
	CONSTRAINT FK_GAME_LOOSER FOREIGN KEY (LooserId) REFERENCES Player(PlayerId)
);	

Create Table Set (
	SetId int not null AUTO_INCREMENT,
	GameId int not null,
	WinnerId int not null,
	SetNumber int not null,
	WinnerPoint int not null,
	LooserPoint int not null,
	CONSTRAINT PK_SET PRIMARY KEY (SetId),
	CONSTRAINT FK_SET_GAME FOREIGN KEY (GameId) REFERENCES Game(GameId),
	CONSTRAINT FK_SET_WINNER FOREIGN KEY (WinnerId) REFERENCES Player(PlayerId)
);