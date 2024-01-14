This test task is designed to assess your technical skills, problem-solving abilities, and attention to detail. We're looking forward to seeing your approach to building a functional, secure, and well-documented app.
Motivation

We need to develop a router-app that handles incoming events and routes them to one or multiple destinations. To receive events app exposes a simple HTTP-endpoint, whereto authorized clients may send HTTP-requests. App should operate according to the specified destinations config and routing strategy. Custom strategy might be specified in client request.
Authorization

App should authorize incoming requests via JWT tokens.
Event

Incoming HTTP-request body contains the event object. Event contains data represented by payload property, this payload will be (or not) routed to one of destinations. Event also contains routing metadata represented by possibleDestinations property, will be used by strategy to decide destination to route to. Property possibleDestinations is an array of routing intents, filled up by undefined random logic. App should analyze this array according to specified destinations config and strategy and decide if message should be sent or not.

Example HTTP request body:

{
	// required payload that should be routed to destinations
	payload: { a:1, b:2, c:3 /* any data */ }, 
	// array or destination intents
	possibleDestinations: [
		{
			destination1: true,
			destination2: false,
			destination3: true
		}, 
		{
			destination1: true,
			destination2: false,
			destination4: false
		},
		{
			destination3: true
		},
		…
	],
	// optional strategy string 'all', string 'any' or string serialized JS function that represent custom client defined strategy. When not specified, default app strategy will be used.
	strategy: 'ALL' | 'ANY' | 'function(possibleDestinations) { return true; }'
	
}

Strategies

App uses strategy to decide routing according to strategy:
• ALL strategy — according to this strategy event should be routed to destination, if all intents for this destination is true.
• ANY strategy — according to this strategy event should be routed to destination, if any intent for this destination is true.
• custom client defined strategy — according to this strategy event should be routed to destination, if specified serialized function returns true.

Default strategy should be specified at app start and applied every time when client HTTP-request doesn't specify one.
Destinations

Since events doesn't contain extensive destination info but only destination names, app should be initialized with destinations dictionary at start. Example:

[
  {
	// destination unique name, matches `possibleDestinations` property names
	name: 'destination1',
	// transport type
	transport: 'http.post'
	// address to send payload to if http.* transport in use
	url: 'https://example.com/destination1',
  },
  {
	// destination unique name, matches `possibleDestinations` property names
	name: 'destination2',
	// transport type
	transport: 'http.post'
	// address to send payload to if http.* transport in use
	url: 'https://example2.com/destination2',
},
{
	// destination unique name, matches `possibleDestinations` property names
	name: 'destination3',
	// transport type
	transport: 'console.log'
  },
  {
	// destination unique name, matches `possibleDestinations` property names
	name: 'destination4',
	// transport type
	transport: 'console.warn'
  },
  ...
]

To route an event, app must send specified payload to the specified transport.
Transports

There are various builtin transports: http.post, https.put, http.get, console.log, console.warn etc. For http.* transports additional param url should be present. Keep in mind that we probably want to extend list of possible transports in future.
Error handling

App should handle possible errors in configuration and input data. It should be resilent to possible abuse. It should provide clear instructions to fix the error and write logs that helps with the debug.
Logging

Every request and it's response should be logged into MongoDB database collection. It should contain original request and response in the same document.
Deployment

App should be distributed into Docker container with a clear setup instructions.
Tests
Test 1

• Default strategy ALL
• Destinations

[
	{
		name: 'destination1',
		url:'http://example.com/endpoint',
		transport: 'http.post'
	},
	{
		name: 'destination2',
		url:'http://example2.com/endpoint',
		transport: 'http.put'
	},
	{
		name: 'destination3',
		url:'http://example3.com/endpoint',
		transport: 'http.get'
	},
	{
		name: 'destination4',
		transport: 'console.log'
	}
]

• Incoming event

{
	payload: { ... },
	possibleDestinations: [
		{
			destination1: true,
			destination2: true,
			destination3: true
		}, 
		{
			destination1: true,
			destination3: false
		},
		{
			destination1: true,
			destination2: true,
			destination4: false
		},
		{
			destination5: true
		}
	]
}

should be sent to:
• POST http://example.com/endpoint
• PUT http://example2.com/endpoint
• log UnknownDestinationError (destination5)

should generate response:

{
	destination1: true,
	destination2: true,
	destination3: false,
	destination4: false,
	destination5: false
}

Test 2

• Default strategy ANY
• Destinations

[
	{
		name: 'destination1',
		url:'http://example.com/endpoint',
		type: 'http.post'
	},
	{
		name: 'destination2',
		url:'http://example2.com/endpoint',
		type: 'http.put'
	},
	{
		name: 'destination3',
		url:'http://example3.com/endpoint',
		type: 'http.get'
	},
	{
		name: 'destination4',
		url:'http://example4.com/endpoint',
		type: 'http.get'
	}
]

• Incoming event

{
	payload: { ... },
	possibleDestinations: [
		{
			destination1: true,
			destination2: true,
			destination3: true
		}, 
		{
			destination1: false,
			destination3: false
		},
		{
			destination1: true,
			destination2: false,
			destination4: false
		},
		{
			destination5: true
		}
	]
}

should be sent to: • POST http://example.com/endpoint
• PUT http://example2.com/endpoint
• GET http://example3.com/endpoint
• log UnknownDestinationError (destination5)

should generate response:

{
	destination1: true,
	destination2: true,
	destination3: true,
	destination4: false,
	destination5: false
}

Test 3 (client defined strategy)

• Default strategy ANY • Destinations

[
	{
		name: 'destination1',
		url:'http://example.com/endpoint',
		transport: 'http.post'
	},
	{
		name: 'destination2',
		url:'http://example2.com/endpoint',
		transport: 'http.put'
	},
	{
		name: 'destination3',
		url:'http://example3.com/endpoint',
		transport: 'http.get'
	},
	{
		name: 'destination4',
		transport: 'console.log'
	}
]

• Incoming event

{
	payload: { ... },
	strategy: '() => { return true; }',
	possibleDestinations: [
		{
			destination1: true,
			destination2: true,
			destination3: true
		}, 
		{
			destination1: true,
			destination3: false
		},
		{
			destination1: true,
			destination2: true,
			destination4: false
		},
		{
			destination5: true
		}
	]
}

should be sent to:
• POST http://example.com/endpoint
• PUT http://example2.com/endpoint
• GET http://example3.com/endpoint
• console.log(payload)
• log UnknownUrlError (destination5)

should generate response:

{
	destination1: true,
	destination2: true,
	destination3: true,
	destination4: true,
	destination5: false
}

Technical Requirements

    Use NodeJS with the Express.js framework.
    Integrate MongoDB for data storage.
    Write clean, readable, and well-documented code.
    Implement basic security features like input validation to prevent common vulnerabilities.

Criteria for Scoring

    Functionality (40%): The API must work as described, handling all required operations (create, read, update, delete).
    Code Quality (20%): Code should be well-organized, readable, and maintainable. Usage of modern JavaScript features and best practices is expected.
    Error Handling (10%): Proper handling of different error scenarios, providing clear and informative error messages.
    Security Practices (10%): Implementation of basic security measures like input validation to prevent SQL injection, cross-site scripting, etc.
    Documentation (10%): A clear README file that includes setup instructions, API endpoints, and usage examples.
    Efficiency (10%): The solution should be optimized for performance and efficient use of resources.

Submission Guidelines

    Submit your code in a version-controlled repository (e.g., GitHub, GitLab).
    Ensure that all dependencies are properly listed and the project can be easily set up.
