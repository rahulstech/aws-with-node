S3 storage class
standard: store frequently access object and need to access with only milliseconds delay.
  pricing:
    0-50 TB $0.025/GB
    50.001 - 450 TB $0.024/GB
    500 TB+ $0.023/GB
standard infrequently access: store infrequently accessed object. access objects in milliseconds delay. for example any offline first app that stores medias for syncing later. 
  pricing: $0.0138/GB
one zone infrequently access
glacier instant retrieval: store objects for longer time and less access than std IA. usually not accessed more than 90 days. object access time in milliseconds.
  pricing: $0.005/GB
standard intelligent tiering: based on access pattern automatically change the storage class. so fro monitoring it changes some extra cost but reduces cost by automatically changing the storage class not access for specified no of day consecutively. it does not monitor access patterns for object size < 128 kb all those objects are stored in standard class
  pricing:
    monitoring cost: $0.0025/1000 objects
    storage cost: 
      frequent access: same as standard class
      infrequent access: same as standard IA
      archive instant access: same as glacier instant access
glacier instant flxible retrieval
glacier deep archive
reduced redundancy: deprecated 

object wise storage class settings from object properties

automate change storage class via life-cycle rule action. it is different from intelligent tiering. for example. a lifecycle rule set when object is older than 30 days then change class to std-IA. where as std-IT checks if the object is not access more than 30 consecutive days then change class to std-IA. if on 28th day from  last access it is accessed again then std-IT will start counting 30 days form that day. but in case of lc-rule even it is access on 28th day still its class is changed on after 2 days i.e. after 30 days

the cost calculation
====================
there are two types of cost: 1. API cost 2. storage cost
1. API cost: uploading an object (PUT, POST requests etc.), downloading an object (GET request etc.), listing or fetching metadata (LIST, HEAD request etc.) are API cost. this API cost is divided in two part: a. cost of request and b. cost of payload. the cost of request if charged per 1000 request and cost of payload is charged per gb. for example: in Standard Infrequent Access
cost of GET / 1000 request = $0.001
cont of payload (Data Retrieval) / GB = $0.01

so total GB downloaded = 100 GB
total cost of payload = 100 GB * $0.01 = $1

total cost of requests $0.0001

total cost = $1 + $0.0001 = $1.0001

so downloading 100 gb in total via 100 separate request costs total 1.0001.

Note: price of request and payload is different for different classes.

Note: standard, standard IT, standard IF, OZ-IA don't charge upload payload but download payload only

Note: payload size is not calculated per request but total in a month, as billed in month.

Note: there is another change called data retrieval request change (rate per 1000 request) usually charged while retrieving from archival state temporarily. 


