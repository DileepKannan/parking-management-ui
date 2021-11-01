package com.elseiver.parking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@Controller
public class DefaultController {

	@GetMapping("/")
	public String home1() {
		return "/booking";
	}

	@GetMapping("/booking")
	public String booking() {
		return "/booking";
	}

	@GetMapping("/closing")
	public String closing() {
		return "/closing";
	}

	@GetMapping("/admin")
	public String admin() {
		return "/admin";
	}

	@GetMapping("/user")
	public String user() {
		return "/user";
	}

	@GetMapping("/about")
	public String about() {
		return "/about";
	}

	@GetMapping("/login")
	public String login() {
		return "/login";
	}

	@GetMapping("/403")
	public String error403() {
		return "/error/403";
	}

}
