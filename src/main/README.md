Hi everyone !!

This is an example that highlights the "Authentication&Authorization" tool provided by Spring Security.

In this example, you will notice that : 

-Non authenticated user can access only "/".

-Authenticated user can access "/" and "/user".

-Admin can access "/" and "/user" and "/admin".

Dependencies used : 

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
			<version>2.1.2.RELEASE</version>
		</dependency>


		<!-- https://mvnrepository.com/artifact/org.webjars/angularjs -->
		<dependency>
			<groupId>org.webjars</groupId>
			<artifactId>angularjs</artifactId>
			<version>1.4.10</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.webjars.bower/jquery -->
		<dependency>
			<groupId>org.webjars.bower</groupId>
			<artifactId>jquery</artifactId>
			<version>3.2.1</version>
		</dependency>


		<!-- https://mvnrepository.com/artifact/org.webjars/bootstrap -->
		<dependency>
			<groupId>org.webjars</groupId>
			<artifactId>bootstrap</artifactId>
			<version>3.2.0</version>
		</dependency>
		
	</dependencies>

Enjoy !!
