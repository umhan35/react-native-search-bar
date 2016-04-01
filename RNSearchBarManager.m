#import "RNSearchBarManager.h"

#import "RNSearchBar.h"

#import "RCTBridge.h"
#import "RCTUIManager.h"

@implementation RNSearchBarManager

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
    return _bridge.uiManager.methodQueue;
}


- (UIView *)view
{
  RNSearchBar *searchBar = [[RNSearchBar alloc] initWithEventDispatcher:self.bridge.eventDispatcher];

  return searchBar;
}

RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(text, NSString)
RCT_EXPORT_VIEW_PROPERTY(showsCancelButton, BOOL)
RCT_EXPORT_VIEW_PROPERTY(barTintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(enablesReturnKeyAutomatically, BOOL)
RCT_CUSTOM_VIEW_PROPERTY(hideBackground, BOOL, RNSearchBar)
{
    if ([RCTConvert BOOL:json]) {
        view.backgroundImage = [[UIImage alloc] init];
        view.backgroundColor = [UIColor clearColor];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(textFieldBackgroundColor, UIColor, RNSearchBar)
{
  if ([RCTConvert UIColor:json]) {
    // logic borrowed from http://stackoverflow.com/a/22266150/395989
    CGSize size = CGSizeMake(34, 34);
    // create context with transparent background
    UIGraphicsBeginImageContextWithOptions(size, NO, 1);

    // Add a clip before drawing anything, in the shape of an rounded rect
    [[UIBezierPath bezierPathWithRoundedRect:CGRectMake(0,0, 34, 34)
                                cornerRadius:5.0] addClip];
    [[RCTConvert UIColor:json]  setFill];

    UIRectFill(CGRectMake(0, 0, size.width, size.height));
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    [view setSearchFieldBackgroundImage:image forState:UIControlStateNormal];
  }
}

//based on http://stackoverflow.com/questions/19048766/
RCT_CUSTOM_VIEW_PROPERTY(textColor, UIColor, RNSearchBar)
{
    if([RCTConvert UIColor:json]) {
       [[UITextField appearanceWhenContainedIn:[RNSearchBar class], nil] setDefaultTextAttributes:@{NSForegroundColorAttributeName:[RCTConvert UIColor:json]}];
    }
}

- (NSDictionary *)constantsToExport
{
  return @{
           @"ComponentHeight": @([self view].intrinsicContentSize.height),
           };
}

RCT_EXPORT_METHOD(blur:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary *viewRegistry){
         RNSearchBar *searchBar = viewRegistry[reactTag];

         if ([searchBar isKindOfClass:[RNSearchBar class]]) {
             [searchBar endEditing:true];
         } else {
             RCTLogError(@"Cannot blur: %@ (tag #%@) is not RNSearchBar", searchBar, reactTag);
         }
     }];
}

RCT_EXPORT_METHOD(focus:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:
     ^(__unused RCTUIManager *uiManager, NSDictionary *viewRegistry){
         RNSearchBar *searchBar = viewRegistry[reactTag];

         if ([searchBar isKindOfClass:[RNSearchBar class]]) {
             [searchBar becomeFirstResponder];
         } else {
             RCTLogError(@"Cannot focus: %@ (tag #%@) is not RNSearchBar", searchBar, reactTag);
         }
     }];
}


@end
