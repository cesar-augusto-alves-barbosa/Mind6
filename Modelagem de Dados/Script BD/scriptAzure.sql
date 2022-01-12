create table Escola (
	idEscola INT PRIMARY KEY IDENTITY(1,1),
	nomeEscola varchar(45) not null,
	telefone char(11) not null,
	nomeDiretor varchar(45) not null,
	rua varchar(45) not null,
	bairro varchar(20) not null,
	estado char(2) not null,
	cidade varchar(30) not null,
	cep char(8) not null
);


create table Tecnico (
	idTecnico int primary key identity(1,1),
	nomeTecnico varchar(45) not null,
	telefoneTec char(11) not null,
	emailTec varchar(45) not null,
	senhaTec varchar(25) not null,
    disponibilidade bit not null,
    fkGestor int,
	fkEscola int not null,
	foreign key (fkEscola) references Escola(idEscola),
    foreign key (fkGestor) references Tecnico(idTecnico)
);

create table Computador (
	idComputador int identity(1,1) primary key not null,
	nomeComputador varchar(15) not null,
	fkEscola int not null,
    sistemaOperacional varchar(15) not null,
    disonibilidade bit not null,
    serialNum varchar(35) not null,
	foreign key (fkEscola) references Escola(idEscola),
	ipv4 varchar(15) not null,
);
  
 create table Alerta (
	idAlerta int primary key identity(1,1) not null,
    tituloAlerta varchar(45) not null,
    tipoAlerta varchar(20) not null,
    descricaoAlerta varchar(45) not null,
    fkComputador int,
    foreign key (fkComputador) references Computador(idComputador),
    dataHora datetime not null
);

create table Blacklist (
	idBlacklist int primary key identity not null,
	nomeProcesso varchar(45) not null
	);
    
 create table Escola_has_Blacklist (
	idEscBlack int primary key identity(1,1) not null,
	fkEscola int not null,
    foreign key (fkEscola) references Escola(idEscola),
	fkBlacklist int not null,
    foreign key (fkBlacklist) references Blacklist(idBlacklist)
);

 create table Computador_has_Blacklist (
	idCompBlack int primary key identity(1,1) not null,
	fkComputador int not null,
    foreign key (fkComputador) references Computador(idComputador),
	fkBlacklist int not null,
    foreign key (fkBlacklist) references Blacklist(idBlacklist)
);


create table Componente (
	idComponente int primary key identity(1,1) not null,
    nomeComponente varchar(65) not null,
    tipoComponente varchar(20) not null,
    fkComputador int not null,
    foreign key (fkComputador) references Computador(idComputador),
    memoriaMax decimal(10,2)
);
  
create table UsoTotal (
	idUsoAtual int primary key identity(1,1) not null,
	usoComponente int not null,
	dataHora datetime not null,
	fkComponente int not null,
	foreign key (fkComponente) references Componente(idComponente)
);
